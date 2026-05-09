import React, { useEffect, useState } from 'react';
import { ContentStatus } from '../adminApi';

export type ProductFormValues = {
  title: string;
  slug: string;
  type: string;
  shortDescription: string;
  longDescription: string;
  priceLabel: string;
  status: ContentStatus;
  coverImageUrl: string;
  galleryUrlsText: string;
  tagsText: string;
  featured: boolean;
  sortOrder: number;
  publishedAt: string;
};

type ProductFormProps = {
  initialValues?: ProductFormValues;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
};

const defaultValues: ProductFormValues = {
  title: '',
  slug: '',
  type: '',
  shortDescription: '',
  longDescription: '',
  priceLabel: '',
  status: 'draft',
  coverImageUrl: '',
  galleryUrlsText: '',
  tagsText: '',
  featured: false,
  sortOrder: 0,
  publishedAt: '',
};

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState<ProductFormValues>(initialValues || defaultValues);

  useEffect(() => {
    setForm(initialValues || defaultValues);
  }, [initialValues]);

  const handleChange = (field: keyof ProductFormValues, value: string | number | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-zinc-300">Título *</label>
          <input
            required
            value={form.title}
            onChange={(event) => handleChange('title', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Slug (opcional)</label>
          <input
            value={form.slug}
            onChange={(event) => handleChange('slug', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Tipo *</label>
          <input
            required
            value={form.type}
            onChange={(event) => handleChange('type', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-zinc-300">Descripción corta *</label>
          <textarea
            required
            rows={2}
            value={form.shortDescription}
            onChange={(event) => handleChange('shortDescription', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-zinc-300">Descripción larga</label>
          <textarea
            rows={3}
            value={form.longDescription}
            onChange={(event) => handleChange('longDescription', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Price label</label>
          <input
            value={form.priceLabel}
            onChange={(event) => handleChange('priceLabel', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Estado</label>
          <select
            value={form.status}
            onChange={(event) => handleChange('status', event.target.value as ContentStatus)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
            <option value="coming_soon">coming_soon</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Cover image URL</label>
          <input
            value={form.coverImageUrl}
            onChange={(event) => handleChange('coverImageUrl', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Sort order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(event) => handleChange('sortOrder', Number(event.target.value))}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-zinc-300">Gallery URLs (comas o líneas)</label>
          <textarea
            rows={3}
            value={form.galleryUrlsText}
            onChange={(event) => handleChange('galleryUrlsText', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Tags (separadas por comas)</label>
          <input
            value={form.tagsText}
            onChange={(event) => handleChange('tagsText', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Published at (opcional)</label>
          <input
            type="datetime-local"
            value={form.publishedAt}
            onChange={(event) => handleChange('publishedAt', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-zinc-200">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(event) => handleChange('featured', event.target.checked)}
          className="h-4 w-4 rounded border-red-700/40 bg-black/45"
        />
        Producto destacado (featured)
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl border border-red-500/55 bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-70"
        >
          {submitting ? 'Guardando...' : 'Guardar producto'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-red-700/45 bg-black/35 px-4 py-2 text-sm text-zinc-200 transition hover:border-red-500/65"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
