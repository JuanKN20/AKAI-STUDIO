const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

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

export type ProjectItem = {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  short_description: string;
  long_description: string | null;
  status: 'draft' | 'published' | 'archived' | 'coming_soon';
  cover_image_url: string | null;
  demo_url: string | null;
  repository_url: string | null;
  technologies: string[];
  featured: boolean;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  deliverables: string[];
  icon_name: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProductItem = {
  id: number;
  title: string;
  slug: string;
  type: string;
  short_description: string;
  long_description: string | null;
  price_label: string | null;
  status: 'draft' | 'published' | 'archived' | 'coming_soon';
  cover_image_url: string | null;
  gallery_urls: string[];
  tags: string[];
  featured: boolean;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.ok) {
    const message = !payload.ok ? payload.error : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload.data;
}

export function getProjects() {
  return request<ProjectItem[]>('/api/projects');
}

export function getServices() {
  return request<ServiceItem[]>('/api/services');
}

export function getProducts() {
  return request<ProductItem[]>('/api/products');
}

export function createContactMessage(payload: ContactPayload) {
  return request('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export { API_BASE_URL };