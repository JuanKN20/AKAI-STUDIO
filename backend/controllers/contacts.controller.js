const { prisma } = require('../db');

const ALLOWED_CONTACT_STATUSES = new Set(['new', 'in_progress', 'resolved', 'archived']);

function parseId(value) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function normalizeOptionalText(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function normalizeRequiredText(value, fieldName) {
  const text = String(value || '').trim();
  if (!text) {
    const error = new Error(`${fieldName} is required`);
    error.status = 400;
    throw error;
  }
  return text;
}

function normalizeEmail(value) {
  const email = normalizeRequiredText(value, 'email').toLowerCase();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(email)) {
    const error = new Error('email is invalid');
    error.status = 400;
    throw error;
  }

  return email;
}

function normalizeContactStatus(value) {
  const status = String(value || '').trim().toLowerCase();

  if (!ALLOWED_CONTACT_STATUSES.has(status)) {
    const error = new Error('Invalid contact status');
    error.status = 400;
    throw error;
  }

  return status;
}

function mapContact(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: row.status,
    created_at: row.createdAt,
    updated_at: row.updatedAt,
  };
}

async function createContact(req, res, next) {
  try {
    const payload = req.body || {};
    const name = normalizeRequiredText(payload.name, 'name');
    const email = normalizeEmail(payload.email);
    const message = normalizeRequiredText(payload.message, 'message');
    const phone = normalizeOptionalText(payload.phone);
    const subject = normalizeOptionalText(payload.subject);

    const row = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    return res.status(201).json({
      ok: true,
      message: 'Contact message received',
      data: mapContact(row),
    });
  } catch (error) {
    return next(error);
  }
}

async function getAdminContacts(req, res, next) {
  try {
    const requestedStatus = req.query.status;
    const where = {};

    if (requestedStatus !== undefined) {
      where.status = normalizeContactStatus(requestedStatus);
    }

    const rows = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ ok: true, data: rows.map(mapContact) });
  } catch (error) {
    return next(error);
  }
}

async function updateContactStatus(req, res, next) {
  try {
    const contactId = parseId(req.params.id);
    if (!contactId) {
      return res.status(400).json({ ok: false, error: 'Invalid contact id' });
    }

    const status = normalizeContactStatus(req.body?.status);

    const row = await prisma.contact.update({
      where: { id: contactId },
      data: { status },
    });

    return res.json({ ok: true, data: mapContact(row) });
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ ok: false, error: 'Contact not found' });
    }
    return next(error);
  }
}

module.exports = {
  createContact,
  getAdminContacts,
  updateContactStatus,
};
