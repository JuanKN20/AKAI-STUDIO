try {
  require('dotenv').config();
} catch {
  // dotenv is optional if variables are injected by the runtime.
}

const { PrismaClient } = require('@prisma/client');

const databaseUrl = (process.env.DATABASE_URL || '').trim();

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is required. Configure it via environment variables (see backend/.env.example).',
  );
}

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

async function testConnection() {
  await prisma.$queryRaw`SELECT 1`;
}

async function disconnect() {
  await prisma.$disconnect();
}

module.exports = {
  prisma,
  testConnection,
  disconnect,
};
