import React, { useEffect, useState } from 'react';

export type ServiceFormValues = {
  title: string;
  slug: string;
  description: string;
  deliverablesText: string;
  iconName: string;
  isActive: boolean;
  sortOrder: number;
};

type ServiceFormProps = {
  initialValues?: ServiceFormValues;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
};

const defaultValues: ServiceFormValues = {
  title: '',
  slug: '',
  description: '',
  deliverablesText: '',
  iconName: '',
  isActive: true,
  sortOrder: 0,
};

const ServiceForm: React.FC<ServiceFormProps> = ({ initialValues, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState<ServiceFormValues>(initialValues || defaultValues);

  useEffect(() => {
    setForm(initialValues || defaultValues);
  }, [initialValues]);

  const handleChange = (field: keyof ServiceFormValues, value: string | number | boolean) => {
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
          <label htmlFor="service-title" className="admin-label">
            Título *
          </label>
          <input
            id="service-title"
            required
            value={form.title}
            onChange={(event) => handleChange('title', event.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="service-slug" className="admin-label">
            Slug (opcional)
          </label>
          <input
            id="service-slug"
            value={form.slug}
            onChange={(event) => handleChange('slug', event.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="service-icon-name" className="admin-label">
            Icon name
          </label>
          <input
            id="service-icon-name"
            value={form.iconName}
            onChange={(event) => handleChange('iconName', event.target.value)}
            className="admin-input"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="service-description" className="admin-label">
            Descripción *
          </label>
          <textarea
            id="service-description"
            required
            rows={3}
            value={form.description}
            onChange={(event) => handleChange('description', event.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="service-deliverables" className="admin-label">
            Deliverables (separar por comas o líneas)
          </label>
          <textarea
            id="service-deliverables"
            rows={3}
            value={form.deliverablesText}
            onChange={(event) => handleChange('deliverablesText', event.target.value)}
            className="admin-textarea"
          />
        </div>

        <div>
          <label htmlFor="service-sort-order" className="admin-label">
            Orden
          </label>
          <input
            id="service-sort-order"
            type="number"
            value={form.sortOrder}
            onChange={(event) => handleChange('sortOrder', Number(event.target.value))}
            className="admin-input"
          />
        </div>
      </div>

      <label htmlFor="service-is-active" className="inline-flex items-center gap-2 text-sm text-zinc-200">
        <input
          id="service-is-active"
          type="checkbox"
          checked={form.isActive}
          onChange={(event) => handleChange('isActive', event.target.checked)}
          className="h-4 w-4 rounded border-red-700/40 bg-black/45"
        />
        Servicio activo
      </label>

      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={submitting} className="admin-btn-primary">
          {submitting ? 'Guardando...' : 'Guardar servicio'}
        </button>
        <button type="button" onClick={onCancel} className="admin-btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
