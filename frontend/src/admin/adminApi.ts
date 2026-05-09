import { API_BASE_URL, ProductItem, ProjectItem, ServiceItem } from '../services/api';

type ApiSuccess<T> = {
  ok: true;
  data: T;
  message?: string;
};

type ApiError = {
  ok: false;
  error: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type ContactStatus = 'new' | 'in_progress' | 'resolved' | 'archived';
export type ContentStatus = 'draft' | 'published' | 'archived' | 'coming_soon';

export type AdminContactItem = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
};

export type ProjectPayload = {
  title: string;
  slug?: string;
  category?: string;
  short_description: string;
  long_description?: string;
  status?: ContentStatus;
  cover_image_url?: string;
  demo_url?: string;
  repository_url?: string;
  technologies?: string[];
  featured?: boolean;
  sort_order?: number;
  published_at?: string | null;
};

export type ServicePayload = {
  title: string;
  slug?: string;
  description: string;
  deliverables?: string[];
  icon_name?: string;
  is_active?: boolean;
  sort_order?: number;
};

export type ProductPayload = {
  title: string;
  slug?: string;
  type: string;
  short_description: string;
  long_description?: string;
  price_label?: string;
  status?: ContentStatus;
  cover_image_url?: string;
  gallery_urls?: string[];
  tags?: string[];
  featured?: boolean;
  sort_order?: number;
  published_at?: string | null;
};

const ADMIN_TOKEN_STORAGE_KEY = 'yorurei_admin_token';

function toApiErrorMessage(status: number, payload: unknown): string {
  if (status === 401) {
    return 'Token admin inválido o expirado. Inicia sesión de nuevo.';
  }

  if (payload && typeof payload === 'object' && 'error' in payload) {
    const value = payload.error;
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  if (status >= 500) {
    return 'Error interno del backend. Revisa los logs del servidor.';
  }

  return `La solicitud falló con estado ${status}.`;
}

function compactPayload<T extends Record<string, unknown>>(payload: T): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined) {
      result[key as keyof T] = value as T[keyof T];
    }
  }

  return result;
}

function normalizeText(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function getStoredAdminToken(): string | null {
  try {
    return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function hasAdminToken(): boolean {
  return Boolean(getStoredAdminToken());
}

export function saveAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
}

async function adminRequest<T>(
  path: string,
  options: RequestInit = {},
  tokenOverride?: string,
): Promise<T> {
  const token = tokenOverride || getStoredAdminToken();

  if (!token) {
    throw new Error('No se encontró token admin. Inicia sesión para continuar.');
  }

  const headers = new Headers(options.headers);
  headers.set('x-admin-token', token);

  if (options.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error('No se pudo conectar con el backend. Verifica que esté corriendo en http://localhost:3001.');
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(toApiErrorMessage(response.status, payload));
  }

  if (!payload || typeof payload !== 'object' || !('ok' in payload)) {
    throw new Error('Respuesta inesperada del backend.');
  }

  const normalized = payload as ApiResponse<T>;
  if (!normalized.ok) {
    throw new Error(normalized.error || 'Error no controlado del backend.');
  }

  return normalized.data;
}

export async function validateAdminToken(token: string): Promise<void> {
  const cleanToken = token.trim();
  if (!cleanToken) {
    throw new Error('Debes ingresar el token admin.');
  }

  await adminRequest<ProjectItem[]>('/api/admin/projects', { method: 'GET' }, cleanToken);
}

export function getAdminProjects() {
  return adminRequest<ProjectItem[]>('/api/admin/projects');
}

export function createProject(payload: ProjectPayload) {
  return adminRequest<ProjectItem>('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(
      compactPayload({
        ...payload,
        slug: normalizeText(payload.slug),
        category: normalizeText(payload.category),
        long_description: normalizeText(payload.long_description),
        cover_image_url: normalizeText(payload.cover_image_url),
        demo_url: normalizeText(payload.demo_url),
        repository_url: normalizeText(payload.repository_url),
      }),
    ),
  });
}

export function updateProject(id: number, payload: Partial<ProjectPayload>) {
  return adminRequest<ProjectItem>(`/api/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(
      compactPayload({
        ...payload,
        slug: normalizeText(payload.slug),
        category: normalizeText(payload.category),
        long_description: normalizeText(payload.long_description),
        cover_image_url: normalizeText(payload.cover_image_url),
        demo_url: normalizeText(payload.demo_url),
        repository_url: normalizeText(payload.repository_url),
      }),
    ),
  });
}

export function deleteProject(id: number) {
  return adminRequest<{ message: string }>(`/api/admin/projects/${id}`, {
    method: 'DELETE',
  });
}

export function getAdminServices() {
  return adminRequest<ServiceItem[]>('/api/admin/services');
}

export function createService(payload: ServicePayload) {
  return adminRequest<ServiceItem>('/api/admin/services', {
    method: 'POST',
    body: JSON.stringify(
      compactPayload({
        ...payload,
        slug: normalizeText(payload.slug),
        icon_name: normalizeText(payload.icon_name),
      }),
    ),
  });
}

export function updateService(id: number, payload: Partial<ServicePayload>) {
  return adminRequest<ServiceItem>(`/api/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(
      compactPayload({
        ...payload,
        slug: normalizeText(payload.slug),
        icon_name: normalizeText(payload.icon_name),
      }),
    ),
  });
}

export function deleteService(id: number) {
  return adminRequest<{ message: string }>(`/api/admin/services/${id}`, {
    method: 'DELETE',
  });
}

export function getAdminProducts() {
  return adminRequest<ProductItem[]>('/api/admin/products');
}

export function createProduct(payload: ProductPayload) {
  return adminRequest<ProductItem>('/api/admin/products', {
    method: 'POST',
    body: JSON.stringify(
      compactPayload({
        ...payload,
        slug: normalizeText(payload.slug),
        long_description: normalizeText(payload.long_description),
        price_label: normalizeText(payload.price_label),
        cover_image_url: normalizeText(payload.cover_image_url),
      }),
    ),
  });
}

export function updateProduct(id: number, payload: Partial<ProductPayload>) {
  return adminRequest<ProductItem>(`/api/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(
      compactPayload({
        ...payload,
        slug: normalizeText(payload.slug),
        long_description: normalizeText(payload.long_description),
        price_label: normalizeText(payload.price_label),
        cover_image_url: normalizeText(payload.cover_image_url),
      }),
    ),
  });
}

export function deleteProduct(id: number) {
  return adminRequest<{ message: string }>(`/api/admin/products/${id}`, {
    method: 'DELETE',
  });
}

export function getAdminContacts() {
  return adminRequest<AdminContactItem[]>('/api/admin/contacts');
}

export function updateContactStatus(id: number, status: ContactStatus) {
  return adminRequest<AdminContactItem>(`/api/admin/contacts/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
