const { prisma } = require('../db');
const slugify = require('../utils/slugify');

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

function normalizeArray(value) {
  if (value === undefined) return undefined;
  if (value === null) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return normalizeArray(parsed) || [];
      } catch {
        return trimmed
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    return trimmed
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeBoolean(value, fieldName) {
  if (value === undefined) return undefined;
  if (typeof value === 'boolean') return value;

  if (typeof value === 'string') {
    const lowered = value.toLowerCase().trim();
    if (lowered === 'true') return true;
    if (lowered === 'false') return false;
  }

  const error = new Error(`${fieldName} must be true or false`);
  error.status = 400;
  throw error;
}

function normalizeInteger(value, fieldName) {
  if (value === undefined) return undefined;
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isInteger(parsed)) {
    const error = new Error(`${fieldName} must be an integer`);
    error.status = 400;
    throw error;
  }
  return parsed;
}

function mapService(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    deliverables: row.deliverables || [],
    icon_name: row.iconName,
    is_active: row.isActive,
    sort_order: row.sortOrder,
    created_at: row.createdAt,
    updated_at: row.updatedAt,
  };
}

async function getPublicServices(req, res, next) {
  try {
    const rows = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json({ ok: true, data: rows.map(mapService) });
  } catch (error) {
    return next(error);
  }
}

async function getPublicServiceBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const row = await prisma.service.findFirst({
      where: { slug, isActive: true },
    });

    if (!row) {
      return res.status(404).json({ ok: false, error: 'Service not found' });
    }

    return res.json({ ok: true, data: mapService(row) });
  } catch (error) {
    return next(error);
  }
}

async function getAdminServices(req, res, next) {
  try {
    const rows = await prisma.service.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return res.json({ ok: true, data: rows.map(mapService) });
  } catch (error) {
    return next(error);
  }
}

async function createService(req, res, next) {
  try {
    const payload = req.body || {};
    const title = normalizeRequiredText(payload.title, 'title');
    const description = normalizeRequiredText(payload.description, 'description');
    const generatedSlug = slugify(payload.slug || title);

    if (!generatedSlug) {
      return res.status(400).json({ ok: false, error: 'slug is required' });
    }

    const deliverables = normalizeArray(payload.deliverables) || [];
    const iconName = normalizeOptionalText(payload.icon_name);
    const isActive = normalizeBoolean(payload.is_active, 'is_active') ?? true;
    const sortOrder = normalizeInteger(payload.sort_order, 'sort_order') ?? 0;

    const row = await prisma.service.create({
      data: {
        title,
        slug: generatedSlug,
        description,
        deliverables,
        iconName,
        isActive,
        sortOrder,
      },
    });

    return res.status(201).json({ ok: true, data: mapService(row) });
  } catch (error) {
    if (error?.code === 'P2002') {
      return res.status(409).json({ ok: false, error: 'Service slug already exists' });
    }
    return next(error);
  }
}

async function updateService(req, res, next) {
  try {
    const serviceId = parseId(req.params.id);
    if (!serviceId) {
      return res.status(400).json({ ok: false, error: 'Invalid service id' });
    }

    const payload = req.body || {};
    const updates = {};

    if (payload.title !== undefined) {
      updates.title = normalizeRequiredText(payload.title, 'title');
    }

    if (payload.slug !== undefined) {
      const slug = slugify(payload.slug);
      if (!slug) {
        return res.status(400).json({ ok: false, error: 'slug is required' });
      }
      updates.slug = slug;
    } else if (updates.title) {
      updates.slug = slugify(updates.title);
    }

    if (payload.description !== undefined) {
      updates.description = normalizeRequiredText(payload.description, 'description');
    }

    if (payload.deliverables !== undefined) {
      updates.deliverables = normalizeArray(payload.deliverables) || [];
    }

    if (payload.icon_name !== undefined) {
      updates.iconName = normalizeOptionalText(payload.icon_name);
    }

    if (payload.is_active !== undefined) {
      updates.isActive = normalizeBoolean(payload.is_active, 'is_active');
    }

    if (payload.sort_order !== undefined) {
      updates.sortOrder = normalizeInteger(payload.sort_order, 'sort_order');
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ ok: false, error: 'No valid fields to update' });
    }

    const row = await prisma.service.update({
      where: { id: serviceId },
      data: updates,
    });

    return res.json({ ok: true, data: mapService(row) });
  } catch (error) {
    if (error?.code === 'P2002') {
      return res.status(409).json({ ok: false, error: 'Service slug already exists' });
    }
    if (error?.code === 'P2025') {
      return res.status(404).json({ ok: false, error: 'Service not found' });
    }
    return next(error);
  }
}

async function deleteService(req, res, next) {
  try {
    const serviceId = parseId(req.params.id);
    if (!serviceId) {
      return res.status(400).json({ ok: false, error: 'Invalid service id' });
    }

    await prisma.service.delete({ where: { id: serviceId } });
    return res.json({ ok: true, message: 'Service deleted' });
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ ok: false, error: 'Service not found' });
    }
    return next(error);
  }
}

module.exports = {
  getPublicServices,
  getPublicServiceBySlug,
  getAdminServices,
  createService,
  updateService,
  deleteService,
};
