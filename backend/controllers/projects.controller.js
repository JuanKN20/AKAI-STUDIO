const { prisma } = require('../db');
const slugify = require('../utils/slugify');

const ALLOWED_PROJECT_STATUSES = new Set(['draft', 'published', 'archived', 'coming_soon']);

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

function normalizeStatus(value) {
  const status = String(value || '').trim().toLowerCase();
  if (!ALLOWED_PROJECT_STATUSES.has(status)) {
    const error = new Error('Invalid project status');
    error.status = 400;
    throw error;
  }
  return status;
}

function normalizeTimestamp(value, fieldName) {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const error = new Error(`${fieldName} is not a valid date`);
    error.status = 400;
    throw error;
  }

  return date;
}

function mapProject(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    short_description: row.shortDescription,
    long_description: row.longDescription,
    status: row.status,
    cover_image_url: row.coverImageUrl,
    demo_url: row.demoUrl,
    repository_url: row.repositoryUrl,
    technologies: row.technologies || [],
    featured: row.featured,
    sort_order: row.sortOrder,
    published_at: row.publishedAt,
    created_at: row.createdAt,
    updated_at: row.updatedAt,
  };
}

async function getPublicProjects(req, res, next) {
  try {
    const requestedStatus = req.query.status;
    const requestedFeatured = req.query.featured;
    let statuses = ['published', 'coming_soon'];

    if (requestedStatus !== undefined) {
      statuses = [normalizeStatus(requestedStatus)];
    }

    let featuredFilter;
    if (requestedFeatured !== undefined) {
      featuredFilter = normalizeBoolean(requestedFeatured, 'featured');
    }

    const where = {
      status: { in: statuses },
    };

    if (featuredFilter !== undefined) {
      where.featured = featuredFilter;
    }

    const rows = await prisma.project.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json({
      ok: true,
      data: rows.map(mapProject),
    });
  } catch (error) {
    return next(error);
  }
}

async function getPublicProjectBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const row = await prisma.project.findFirst({
      where: {
        slug,
        status: { in: ['published', 'coming_soon'] },
      },
    });

    if (!row) {
      return res.status(404).json({ ok: false, error: 'Project not found' });
    }

    return res.json({ ok: true, data: mapProject(row) });
  } catch (error) {
    return next(error);
  }
}

async function getAdminProjects(req, res, next) {
  try {
    const rows = await prisma.project.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json({ ok: true, data: rows.map(mapProject) });
  } catch (error) {
    return next(error);
  }
}

async function createProject(req, res, next) {
  try {
    const payload = req.body || {};

    const title = normalizeRequiredText(payload.title, 'title');
    const shortDescription = normalizeRequiredText(payload.short_description, 'short_description');
    const generatedSlug = slugify(payload.slug || title);

    if (!generatedSlug) {
      return res.status(400).json({ ok: false, error: 'slug is required' });
    }

    const status = payload.status ? normalizeStatus(payload.status) : 'draft';
    const category = normalizeOptionalText(payload.category);
    const longDescription = normalizeOptionalText(payload.long_description);
    const coverImageUrl = normalizeOptionalText(payload.cover_image_url);
    const demoUrl = normalizeOptionalText(payload.demo_url);
    const repositoryUrl = normalizeOptionalText(payload.repository_url);
    const technologies = normalizeArray(payload.technologies) || [];
    const featured = normalizeBoolean(payload.featured, 'featured') ?? false;
    const sortOrder = normalizeInteger(payload.sort_order, 'sort_order') ?? 0;
    const publishedAt = normalizeTimestamp(payload.published_at, 'published_at');

    const row = await prisma.project.create({
      data: {
        title,
        slug: generatedSlug,
        category,
        shortDescription,
        longDescription,
        status,
        coverImageUrl,
        demoUrl,
        repositoryUrl,
        technologies,
        featured,
        sortOrder,
        publishedAt,
      },
    });

    return res.status(201).json({ ok: true, data: mapProject(row) });
  } catch (error) {
    if (error?.code === 'P2002') {
      return res.status(409).json({ ok: false, error: 'Project slug already exists' });
    }
    return next(error);
  }
}

async function updateProject(req, res, next) {
  try {
    const projectId = parseId(req.params.id);
    if (!projectId) {
      return res.status(400).json({ ok: false, error: 'Invalid project id' });
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

    if (payload.category !== undefined) updates.category = normalizeOptionalText(payload.category);
    if (payload.short_description !== undefined) {
      updates.shortDescription = normalizeRequiredText(payload.short_description, 'short_description');
    }
    if (payload.long_description !== undefined) {
      updates.longDescription = normalizeOptionalText(payload.long_description);
    }
    if (payload.status !== undefined) updates.status = normalizeStatus(payload.status);
    if (payload.cover_image_url !== undefined) {
      updates.coverImageUrl = normalizeOptionalText(payload.cover_image_url);
    }
    if (payload.demo_url !== undefined) updates.demoUrl = normalizeOptionalText(payload.demo_url);
    if (payload.repository_url !== undefined) {
      updates.repositoryUrl = normalizeOptionalText(payload.repository_url);
    }
    if (payload.technologies !== undefined) {
      updates.technologies = normalizeArray(payload.technologies) || [];
    }
    if (payload.featured !== undefined) {
      updates.featured = normalizeBoolean(payload.featured, 'featured');
    }
    if (payload.sort_order !== undefined) {
      updates.sortOrder = normalizeInteger(payload.sort_order, 'sort_order');
    }
    if (payload.published_at !== undefined) {
      updates.publishedAt = normalizeTimestamp(payload.published_at, 'published_at');
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ ok: false, error: 'No valid fields to update' });
    }

    const row = await prisma.project.update({
      where: { id: projectId },
      data: updates,
    });

    return res.json({ ok: true, data: mapProject(row) });
  } catch (error) {
    if (error?.code === 'P2002') {
      return res.status(409).json({ ok: false, error: 'Project slug already exists' });
    }
    if (error?.code === 'P2025') {
      return res.status(404).json({ ok: false, error: 'Project not found' });
    }
    return next(error);
  }
}

async function deleteProject(req, res, next) {
  try {
    const projectId = parseId(req.params.id);
    if (!projectId) {
      return res.status(400).json({ ok: false, error: 'Invalid project id' });
    }

    await prisma.project.delete({ where: { id: projectId } });
    return res.json({ ok: true, message: 'Project deleted' });
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ ok: false, error: 'Project not found' });
    }
    return next(error);
  }
}

module.exports = {
  getPublicProjects,
  getPublicProjectBySlug,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
};
