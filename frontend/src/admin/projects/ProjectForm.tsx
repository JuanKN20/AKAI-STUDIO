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
    setForm((previous) => ({
      ...previous,
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
          <label htmlFor="project-title" className="admin-label">
            Título *
          </label>
          <input
            id="project-title"
            required
            value={form.title}
            onChange={(event) => handleChange('title', event.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="project-slug" className="admin-label">
            Slug (opcional)
          </label>
          <input
            id="project-slug"
            value={form.slug}
            onChange={(event) => handleChange('slug', event.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="project-category" className="admin-label">
            Categoría
          </label>
          <input
            id="project-category"
            value={form.category}
            onChange={(event) => handleChange('category', event.target.value)}
            className="admin-input"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="project-short-description" className="admin-label">
            Descripción corta *
          </label>
          <textarea
            id="project-short-description"
            required
            rows={2}
            value={form.shortDescription}
            onChange={(event) => handleChange('shortDescription', event.target.value)}
            className="admin-textarea min-h-20"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="project-long-description" className="admin-label">
            Descripción larga
          </label>
          <textarea
            id="project-long-description"
            rows={3}
            value={form.longDescription}
            onChange={(event) => handleChange('longDescription', event.target.value)}
            className="admin-textarea min-h-24"
          />
        </div>

        <div>
          <label htmlFor="project-status" className="admin-label">
            Estado
          </label>
          <select
            id="project-status"
            value={form.status}
            onChange={(event) => handleChange('status', event.target.value as ContentStatus)}
            className="admin-select"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
            <option value="coming_soon">coming_soon</option>
          </select>
        </div>

        <div>
          <label htmlFor="project-sort-order" className="admin-label">
            Orden
          </label>
          <input
            id="project-sort-order"
            type="number"
            value={form.sortOrder}
            onChange={(event) => handleChange('sortOrder', Number(event.target.value))}
            className="admin-input"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="project-technologies" className="admin-label">
            Tecnologías (separadas por comas)
          </label>
          <textarea
            id="project-technologies"
            rows={2}
            value={form.technologiesText}
            onChange={(event) => handleChange('technologiesText', event.target.value)}
            className="admin-textarea min-h-20"
          />
        </div>

        <div>
          <label htmlFor="project-cover-image-url" className="admin-label">
            Cover image URL
          </label>
          <input
            id="project-cover-image-url"
            value={form.coverImageUrl}
            onChange={(event) => handleChange('coverImageUrl', event.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="project-demo-url" className="admin-label">
            Demo URL
          </label>
          <input
            id="project-demo-url"
            value={form.demoUrl}
            onChange={(event) => handleChange('demoUrl', event.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="project-repository-url" className="admin-label">
            Repository URL
          </label>
          <input
            id="project-repository-url"
            value={form.repositoryUrl}
            onChange={(event) => handleChange('repositoryUrl', event.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="project-published-at" className="admin-label">
            Published at (opcional)
          </label>
          <input
            id="project-published-at"
            type="datetime-local"
            value={form.publishedAt}
            onChange={(event) => handleChange('publishedAt', event.target.value)}
            className="admin-input"
          />
        </div>
      </div>

      <label htmlFor="project-featured" className="inline-flex items-center gap-2 text-sm text-zinc-200">
        <input
          id="project-featured"
          type="checkbox"
          checked={form.featured}
          onChange={(event) => handleChange('featured', event.target.checked)}
          className="h-4 w-4 rounded border-red-700/40 bg-black/45"
        />
        Proyecto destacado (featured)
      </label>

      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={submitting} className="admin-btn-primary">
          {submitting ? 'Guardando...' : 'Guardar proyecto'}
        </button>
        <button type="button" onClick={onCancel} className="admin-btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
