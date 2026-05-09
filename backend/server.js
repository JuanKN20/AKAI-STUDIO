try {
  require('dotenv').config();
} catch {
  // dotenv is optional at runtime if environment variables are injected externally.
}

const express = require('express');
const cors = require('cors');

const db = require('./db');
const projectsRoutes = require('./routes/projects.routes');
const servicesRoutes = require('./routes/services.routes');
const productsRoutes = require('./routes/products.routes');
const contactsRoutes = require('./routes/contacts.routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

const configuredOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (configuredOrigins.length === 0 && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    if (configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'Yorurei Studio API',
  });
});

// Legacy endpoint kept for backward compatibility with the internal /usuarios view.
app.get('/api/usuarios', async (req, res, next) => {
  try {
    const rows = await db.prisma.$queryRawUnsafe('SELECT * FROM usuarios ORDER BY id ASC');
    return res.json(rows);
  } catch (error) {
    if (error?.code === 'P2010' && error?.meta?.code === '42P01') {
      return res.json([]);
    }

    if (String(error?.message || '').toLowerCase().includes('relation "usuarios" does not exist')) {
      return res.json([]);
    }

    return next(error);
  }
});

app.use('/api', projectsRoutes);
app.use('/api', servicesRoutes);
app.use('/api', productsRoutes);
app.use('/api', contactsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT || 3001);

async function startServer() {
  try {
    await db.testConnection();
    console.log('[db] Connection ready');
  } catch (error) {
    console.warn(`[db] Connection check failed: ${error.message}`);
  }

  app.listen(port, () => {
    console.log(`[server] Yorurei Studio API running on http://localhost:${port}`);
  });
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    try {
      await db.disconnect();
    } finally {
      process.exit(0);
    }
  });
}

startServer();
