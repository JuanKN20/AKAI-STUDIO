import React, { useEffect, useState } from 'react';
import { AdminContactItem, ContactStatus, getAdminContacts, updateContactStatus } from '../adminApi';

const statusOptions: ContactStatus[] = ['new', 'in_progress', 'resolved', 'archived'];

function statusClass(status: ContactStatus): string {
  if (status === 'resolved') return 'border-emerald-500/50 bg-emerald-950/35 text-emerald-200';
  if (status === 'in_progress') return 'border-sky-500/50 bg-sky-950/35 text-sky-200';
  if (status === 'archived') return 'border-zinc-500/45 bg-zinc-950/35 text-zinc-300';
  return 'border-amber-500/50 bg-amber-950/35 text-amber-200';
}

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<AdminContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [draftStatuses, setDraftStatuses] = useState<Record<number, ContactStatus>>({});

  const loadContacts = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getAdminContacts();
      setContacts(data);
      setDraftStatuses((previous) => {
        const next: Record<number, ContactStatus> = {};
        for (const contact of data) {
          next[contact.id] = previous[contact.id] || contact.status;
        }
        return next;
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar los contactos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadContacts();
  }, []);

  const saveStatus = async (contact: AdminContactItem) => {
    const nextStatus = draftStatuses[contact.id] || contact.status;
    if (nextStatus === contact.status) return;

    setUpdatingId(contact.id);
    setError('');

    try {
      await updateContactStatus(contact.id, nextStatus);
      await loadContacts();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'No se pudo actualizar el estado del contacto.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="space-y-4">
      <header className="admin-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="admin-kicker">Admin</p>
          <h1 className="text-2xl font-bold text-white">Contactos</h1>
          <p className="text-sm text-zinc-300">Gestiona solicitudes recibidas y su estado interno de seguimiento.</p>
        </div>
        <button type="button" onClick={() => void loadContacts()} className="admin-btn-secondary">
          Recargar
        </button>
      </header>

      {error ? <div className="rounded-xl border border-red-700/60 bg-red-950/35 px-4 py-3 text-sm text-red-100">{error}</div> : null}

      {loading ? <div className="admin-surface p-4 text-sm text-zinc-300">Cargando contactos...</div> : null}

      {!loading && !error ? (
        <div className="grid gap-3">
          {contacts.map((contact) => (
            <article key={contact.id} className="akai-card p-4 sm:p-5">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">{contact.name}</h3>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClass(contact.status)}`}>
                      {contact.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    {contact.email}
                    {contact.phone ? ` • ${contact.phone}` : ''} • {new Date(contact.created_at).toLocaleString()}
                  </p>
                  {contact.subject ? <p className="mt-2 text-sm text-red-200">Asunto: {contact.subject}</p> : null}
                  <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-200">{contact.message}</p>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor={`contact-status-${contact.id}`} className="sr-only">
                    Estado del contacto {contact.name}
                  </label>
                  <select
                    id={`contact-status-${contact.id}`}
                    value={draftStatuses[contact.id] || contact.status}
                    onChange={(event) =>
                      setDraftStatuses((previous) => ({
                        ...previous,
                        [contact.id]: event.target.value as ContactStatus,
                      }))
                    }
                    className="admin-select min-w-36 px-3 py-2 text-xs"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    disabled={updatingId === contact.id}
                    onClick={() => void saveStatus(contact)}
                    className="admin-btn-secondary px-3 py-2 text-xs"
                  >
                    {updatingId === contact.id ? 'Guardando...' : 'Guardar'}
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

export default AdminContacts;
