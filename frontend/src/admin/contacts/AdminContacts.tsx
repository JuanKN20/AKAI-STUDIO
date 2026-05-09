import React, { useEffect, useState } from 'react';
import { AdminContactItem, ContactStatus, getAdminContacts, updateContactStatus } from '../adminApi';

const statusOptions: ContactStatus[] = ['new', 'in_progress', 'resolved', 'archived'];

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
      <header className="akai-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-red-300/85">Admin</p>
          <h1 className="text-2xl font-bold text-white">Contactos</h1>
          <p className="text-sm text-zinc-300">Gestiona mensajes recibidos y su estado interno de seguimiento.</p>
        </div>
        <button
          type="button"
          onClick={() => void loadContacts()}
          className="rounded-xl border border-red-700/45 bg-black/35 px-4 py-2 text-sm text-zinc-100 transition hover:border-red-500/65"
        >
          Recargar
        </button>
      </header>

      {error ? <div className="rounded-xl border border-red-800/55 bg-red-950/35 px-4 py-3 text-sm text-red-200">{error}</div> : null}

      {loading ? <div className="akai-panel p-4 text-sm text-zinc-300">Cargando contactos...</div> : null}

      {!loading && !error ? (
        <div className="grid gap-3">
          {contacts.map((contact) => (
            <article key={contact.id} className="akai-card p-4">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">{contact.name}</h3>
                    <span className="akai-chip">{contact.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    {contact.email}
                    {contact.phone ? ` • ${contact.phone}` : ''} • {new Date(contact.created_at).toLocaleString()}
                  </p>
                  {contact.subject ? <p className="mt-2 text-sm text-red-200">Asunto: {contact.subject}</p> : null}
                  <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-200">{contact.message}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={draftStatuses[contact.id] || contact.status}
                    onChange={(event) =>
                      setDraftStatuses((previous) => ({
                        ...previous,
                        [contact.id]: event.target.value as ContactStatus,
                      }))
                    }
                    className="rounded-lg border border-red-900/40 bg-black/45 px-3 py-2 text-xs text-zinc-100"
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
                    className="rounded-lg border border-red-700/45 bg-black/35 px-3 py-2 text-xs text-zinc-100 transition hover:border-red-500/65 disabled:opacity-65"
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
