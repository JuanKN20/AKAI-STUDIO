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
          <label className="mb-1 block text-xs text-zinc-300">Icon name</label>
          <input
            value={form.iconName}
            onChange={(event) => handleChange('iconName', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-zinc-300">Descripción *</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(event) => handleChange('description', event.target.value)}
            className="w-full rounded-xl border border-red-900/40 bg-black/45 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-zinc-300">Deliverables (separar por comas o líneas)</label>
          <textarea
            rows={3}
            value={form.deliverablesText}
            onChange={(event) => handleChange('deliverablesText', event.target.value)}
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
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-zinc-200">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(event) => handleChange('isActive', event.target.checked)}
          className="h-4 w-4 rounded border-red-700/40 bg-black/45"
        />
        Servicio activo
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl border border-red-500/55 bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-70"
        >
          {submitting ? 'Guardando...' : 'Guardar servicio'}
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

export default ServiceForm;
