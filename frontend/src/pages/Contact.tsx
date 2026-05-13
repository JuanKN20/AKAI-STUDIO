import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { createContactMessage } from '../services/api';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const phone = form.phone.trim();
    const subject = form.subject.trim();

    if (!name || !email || !message) {
      setErrorMessage('Completa nombre, correo electrónico y mensaje.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);

    try {
      await createContactMessage({
        name,
        email,
        message,
        phone: phone || undefined,
        subject: subject || undefined,
      });
      setSuccessMessage('Solicitud enviada correctamente');
      setForm(initialFormState);
    } catch {
      setErrorMessage('No se pudo enviar la solicitud. Verifica la conexión con el backend e inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Contacto</p>
      </div>
      <h1 className="akai-section-title mt-3">Conversemos sobre tu próximo proyecto</h1>
      <p className="akai-section-subtitle">
        ¿Tienes una idea, proyecto o experiencia digital en mente? En Yorurei Studio podemos ayudarte a convertirla en una solución
        visual, interactiva y funcional.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="akai-card p-6">
          <h2 className="text-xl font-semibold text-white">Canales directos</h2>
          <div className="mt-5 space-y-4 text-sm text-zinc-300">
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-red-300" />
              contacto@yorurei-studio.dev
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-red-300" />
              +57 300 000 0000
            </p>
            <p className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-red-300" />
              Tiempo de respuesta estimado: 24-48 horas
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href="#contact-form" className="akai-btn-primary w-full">
              Iniciar proyecto
            </a>
            <a href="#contact-form" className="akai-btn-secondary w-full">
              Solicitar información
            </a>
          </div>

          <a
            href="https://wa.me/573000000000"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-red-500/45 bg-black/35 px-5 py-3 text-sm font-semibold text-red-100 transition hover:border-red-400/75 hover:bg-red-950/45"
          >
            Contactar por WhatsApp
          </a>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.youtube.com/channel/UCyPRSLaqSn6jiuHRjz-952g/posts?pvf=CAE%253D"
              aria-label="YouTube"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="TikTok pendiente"
              title="Red social pendiente"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
            >
              <FaTiktok className="h-5 w-5" />
            </a>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="Instagram pendiente"
              title="Red social pendiente"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-2 text-xs text-zinc-500">TikTok e Instagram oficiales: pendiente.</p>
        </section>

        <section id="contact-form" className="akai-panel p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Formulario de contacto</h2>
            <span className="rounded-full border border-red-500/40 bg-red-950/45 px-3 py-1 text-[11px] uppercase tracking-wide text-red-100">
              API pública
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                Nombre *
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => handleChange('name', event.target.value)}
                placeholder="Nombre de contacto"
                className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                Correo electrónico *
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => handleChange('email', event.target.value)}
                placeholder="correo@empresa.com"
                className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Teléfono
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => handleChange('phone', event.target.value)}
                  placeholder="+57..."
                  className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Asunto
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(event) => handleChange('subject', event.target.value)}
                  placeholder="Resumen del proyecto"
                  className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                Mensaje *
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={(event) => handleChange('message', event.target.value)}
                placeholder="Describe tu proyecto"
                className="h-32 w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
            </div>

            {successMessage ? (
              <p className="rounded-xl border border-emerald-500/45 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-200">{successMessage}</p>
            ) : null}
            {errorMessage ? (
              <p className="rounded-xl border border-red-700/60 bg-red-950/30 px-4 py-2 text-sm text-red-200">{errorMessage}</p>
            ) : null}

            <button type="submit" disabled={loading} className="akai-btn-primary w-full gap-2 disabled:opacity-70">
              {loading ? 'Enviando solicitud...' : 'Enviar mensaje'}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
