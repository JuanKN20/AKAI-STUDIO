import React, { useEffect, useMemo, useState } from 'react';
import { createProject, deleteProject, getAdminProjects, ProjectPayload, updateProject } from '../adminApi';
import { ProjectItem } from '../../services/api';
import ProjectForm, { ProjectFormValues } from './ProjectForm';

function splitCsv(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toDateTimeLocalValue(value: string | null): string {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  const offset = parsed.getTimezoneOffset() * 60000;
  return new Date(parsed.getTime() - offset).toISOString().slice(0, 16);
}

function toFormValues(item: ProjectItem): ProjectFormValues {
  return {
    title: item.title,
    slug: item.slug || '',
    category: item.category || '',
    shortDescription: item.short_description,
    longDescription: item.long_description || '',
    status: item.status,
    coverImageUrl: item.cover_image_url || '',
    demoUrl: item.demo_url || '',
    repositoryUrl: item.repository_url || '',
    technologiesText: item.technologies.join(', '),
    featured: item.featured,
    sortOrder: item.sort_order,
    publishedAt: toDateTimeLocalValue(item.published_at),
  };
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editorTarget, setEditorTarget] = useState<ProjectItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  const isEditing = Boolean(editorTarget);

  const sortedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        if (a.sort_order === b.sort_order) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return a.sort_order - b.sort_order;
      }),
    [projects],
  );

  const loadProjects = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getAdminProjects();
      setProjects(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar los proyectos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const openCreate = () => {
    setFormError('');
    setEditorTarget(null);
  };

  const openEdit = (project: ProjectItem) => {
    setFormError('');
    setEditorTarget(project);
  };

  const closeForm = () => {
    setEditorTarget(null);
    setFormError('');
  };

  const handleSubmit = async (values: ProjectFormValues) => {
    const payload: ProjectPayload = {
      title: values.title.trim(),
      slug: values.slug.trim() || undefined,
      category: values.category.trim() || undefined,
      short_description: values.shortDescription.trim(),
      long_description: values.longDescription.trim() || undefined,
      status: values.status,
      cover_image_url: values.coverImageUrl.trim() || undefined,
      demo_url: values.demoUrl.trim() || undefined,
      repository_url: values.repositoryUrl.trim() || undefined,
      technologies: splitCsv(values.technologiesText),
      featured: values.featured,
      sort_order: values.sortOrder,
      published_at: values.publishedAt ? new Date(values.publishedAt).toISOString() : null,
    };

    setSubmitting(true);
    setFormError('');

    try {
      if (isEditing && editorTarget) {
        await updateProject(editorTarget.id, payload);
      } else {
        await createProject(payload);
      }

      await loadProjects();
      closeForm();
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : 'No se pudo guardar el proyecto.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (project: ProjectItem) => {
    const confirmed = window.confirm(`¿Eliminar el proyecto "${project.title}"? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    setDeletingId(project.id);
    setError('');

    try {
      await deleteProject(project.id);
      await loadProjects();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar el proyecto.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-4">
      <header className="akai-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-red-300/85">Admin</p>
          <h1 className="text-2xl font-bold text-white">Proyectos</h1>
          <p className="text-sm text-zinc-300">Gestiona proyectos, status, featured y orden desde este panel interno.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-xl border border-red-500/55 bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Nuevo proyecto
        </button>
      </header>

      <div className="akai-panel p-4">
        <h2 className="mb-3 text-sm font-semibold text-red-200">{isEditing ? 'Editar proyecto' : 'Crear proyecto'}</h2>
        <ProjectForm
          initialValues={editorTarget ? toFormValues(editorTarget) : undefined}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitting={submitting}
        />
        {formError ? <p className="mt-3 text-sm text-red-300">{formError}</p> : null}
      </div>

      {error ? <div className="rounded-xl border border-red-800/55 bg-red-950/35 px-4 py-3 text-sm text-red-200">{error}</div> : null}

      {loading ? <div className="akai-panel p-4 text-sm text-zinc-300">Cargando proyectos...</div> : null}

      {!loading && !error ? (
        <div className="grid gap-3">
          {sortedProjects.map((project) => (
            <article key={project.id} className="akai-card p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <span className="akai-chip">{project.status}</span>
                    {project.featured ? <span className="akai-chip border-red-500/70 text-red-100">featured</span> : null}
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    slug: {project.slug} • category: {project.category || '-'} • sort: {project.sort_order}
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">{project.short_description}</p>
                  {project.technologies.length ? (
                    <p className="mt-2 text-xs text-zinc-400">Tecnologías: {project.technologies.join(', ')}</p>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(project)}
                    className="rounded-lg border border-red-700/45 bg-black/35 px-3 py-2 text-xs text-zinc-200 transition hover:border-red-500/65"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === project.id}
                    onClick={() => void handleDelete(project)}
                    className="rounded-lg border border-red-700/45 bg-red-950/30 px-3 py-2 text-xs text-red-200 transition hover:border-red-500/75 disabled:opacity-60"
                  >
                    {deletingId === project.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default AdminProjects;
