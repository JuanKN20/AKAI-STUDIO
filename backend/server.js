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
const uploadsRoutes = require('./routes/uploads.routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-token'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
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
app.use('/api', uploadsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number.parseInt(String(process.env.PORT || '3001'), 10);
const safePort = Number.isInteger(port) && port > 0 ? port : 3001;
let serverInstance = null;
let shuttingDown = false;

async function startServer() {
  try {
    await db.testConnection();
    console.log('[db] Connection ready');
  } catch (error) {
    console.warn(`[db] Connection check failed: ${error.message}`);
  }

  serverInstance = app.listen(safePort, () => {
    console.log(`[server] Yorurei Studio API listening on port ${safePort}`);
    console.log('[server] Allowed CORS origins:', allowedOrigins);
  });
}

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`[server] Received ${signal}, shutting down...`);

  try {
    if (serverInstance) {
      await new Promise((resolve) => serverInstance.close(resolve));
    }
    await db.disconnect();
  } finally {
    process.exit(0);
  }
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    void shutdown(signal);
  });
}

startServer();
