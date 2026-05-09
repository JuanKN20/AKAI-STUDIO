import React, { useEffect, useMemo, useState } from 'react';
import { createService, deleteService, getAdminServices, ServicePayload, updateService } from '../adminApi';
import { ServiceItem } from '../../services/api';
import ServiceForm, { ServiceFormValues } from './ServiceForm';

function splitList(value: string): string[] {
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toFormValues(item: ServiceItem): ServiceFormValues {
  return {
    title: item.title,
    slug: item.slug || '',
    description: item.description,
    deliverablesText: item.deliverables.join('\n'),
    iconName: item.icon_name || '',
    isActive: item.is_active,
    sortOrder: item.sort_order,
  };
}

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editorTarget, setEditorTarget] = useState<ServiceItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  const isEditing = Boolean(editorTarget);

  const sortedServices = useMemo(
    () =>
      [...services].sort((a, b) => {
        if (a.sort_order === b.sort_order) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return a.sort_order - b.sort_order;
      }),
    [services],
  );

  const loadServices = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getAdminServices();
      setServices(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar los servicios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadServices();
  }, []);

  const openCreate = () => {
    setFormError('');
    setEditorTarget(null);
  };

  const openEdit = (service: ServiceItem) => {
    setFormError('');
    setEditorTarget(service);
  };

  const closeForm = () => {
    setEditorTarget(null);
    setFormError('');
  };

  const handleSubmit = async (values: ServiceFormValues) => {
    const payload: ServicePayload = {
      title: values.title.trim(),
      slug: values.slug.trim() || undefined,
      description: values.description.trim(),
      deliverables: splitList(values.deliverablesText),
      icon_name: values.iconName.trim() || undefined,
      is_active: values.isActive,
      sort_order: values.sortOrder,
    };

    setSubmitting(true);
    setFormError('');

    try {
      if (isEditing && editorTarget) {
        await updateService(editorTarget.id, payload);
      } else {
        await createService(payload);
      }

      await loadServices();
      closeForm();
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : 'No se pudo guardar el servicio.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (service: ServiceItem) => {
    const confirmed = window.confirm(`¿Eliminar el servicio "${service.title}"?`);
    if (!confirmed) return;

    setDeletingId(service.id);
    setError('');

    try {
      await deleteService(service.id);
      await loadServices();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar el servicio.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-4">
      <header className="admin-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="admin-kicker">Admin</p>
          <h1 className="text-2xl font-bold text-white">Servicios</h1>
          <p className="text-sm text-zinc-300">Gestiona catálogo, estado activo y prioridad de servicios.</p>
        </div>
        <button type="button" onClick={openCreate} className="admin-btn-primary">
          Nuevo servicio
        </button>
      </header>

      <div className="admin-surface p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-red-200">{isEditing ? 'Editar servicio' : 'Crear servicio'}</h2>
        <ServiceForm
          initialValues={editorTarget ? toFormValues(editorTarget) : undefined}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitting={submitting}
        />
        {formError ? <p className="mt-3 text-sm text-red-200">{formError}</p> : null}
      </div>

      {error ? <div className="rounded-xl border border-red-700/60 bg-red-950/35 px-4 py-3 text-sm text-red-100">{error}</div> : null}

      {loading ? <div className="admin-surface p-4 text-sm text-zinc-300">Cargando servicios...</div> : null}

      {!loading && !error ? (
        <div className="grid gap-3">
          {sortedServices.map((service) => (
            <article key={service.id} className="akai-card p-4 sm:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        service.is_active
                          ? 'border-emerald-500/50 bg-emerald-950/35 text-emerald-200'
                          : 'border-zinc-500/45 bg-zinc-950/35 text-zinc-300'
                      }`}
                    >
                      {service.is_active ? 'active' : 'inactive'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    slug: {service.slug} • icono: {service.icon_name || '-'} • orden: {service.sort_order}
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">{service.description}</p>
                  {service.deliverables.length ? (
                    <p className="mt-2 text-xs text-zinc-400">Entregables: {service.deliverables.join(', ')}</p>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button type="button" onClick={() => openEdit(service)} className="admin-btn-secondary px-3 py-2 text-xs">
                    Editar
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === service.id}
                    onClick={() => void handleDelete(service)}
                    className="admin-btn-danger px-3 py-2 text-xs"
                  >
                    {deletingId === service.id ? 'Eliminando...' : 'Eliminar'}
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

export default AdminServices;
