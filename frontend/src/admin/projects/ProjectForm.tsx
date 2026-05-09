import React, { useEffect, useState } from 'react';
import { ContentStatus } from '../adminApi';

export type ProjectFormValues = {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  status: ContentStatus;
  coverImageUrl: string;
  demoUrl: string;
  repositoryUrl: string;
  technologiesText: string;
  featured: boolean;
  sortOrder: number;
  publishedAt: string;
};

type ProjectFormProps = {
  initialValues?: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
};

const defaultValues: ProjectFormValues = {
  title: '',
  slug: '',
  category: '',
  shortDescription: '',
  longDescription: '',
  status: 'draft',
  coverImageUrl: '',
  demoUrl: '',
  repositoryUrl: '',
  technologiesText: '',
  featured: false,
  sortOrder: 0,
  publishedAt: '',
};

const ProjectForm: React.FC<ProjectFormProps> = ({ initialValues, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState<ProjectFormValues>(initialValues || defaultValues);

  useEffect(() => {
    setForm(initialValues || defaultValues);
  }, [initialValues]);

  const handleChange = (field: keyof ProjectFormValues, value: string | number | boolean) => {
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
          <label className="mb-1 block text-xs text-zinc-300">Categoría</label>
          <input
            value={form.category}
            onChange={(event) => handleChange('category', event.target.value)}
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
          <label className="mb-1 block text-xs text-zinc-300">Sort order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(event) => handleChange('sortOrder', Number(event.target.value))}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-zinc-300">Tecnologías (separadas por comas)</label>
          <textarea
            rows={2}
            value={form.technologiesText}
            onChange={(event) => handleChange('technologiesText', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
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
          <label className="mb-1 block text-xs text-zinc-300">Demo URL</label>
          <input
            value={form.demoUrl}
            onChange={(event) => handleChange('demoUrl', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-300">Repository URL</label>
          <input
            value={form.repositoryUrl}
            onChange={(event) => handleChange('repositoryUrl', event.target.value)}
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
        Proyecto destacado (featured)
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl border border-red-500/55 bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-70"
        >
          {submitting ? 'Guardando...' : 'Guardar proyecto'}
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

export default ProjectForm;
