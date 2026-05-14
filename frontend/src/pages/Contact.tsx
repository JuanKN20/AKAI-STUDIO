import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { createContactMessage } from '../services/api';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const MIN_MESSAGE_LENGTH = 20;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validateForm(values: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'El nombre es obligatorio.';
  }

  if (!email) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (!message) {
    errors.message = 'El mensaje es obligatorio.';
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres.`;
  }

  return errors;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage('');
      setErrorMessage('Revisa los campos marcados para continuar.');
      return;
    }

    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    try {
      await createContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        phone: form.phone.trim() || undefined,
        subject: form.subject.trim() || undefined,
      });
      setSuccessMessage('Mensaje enviado correctamente. Te responderemos lo antes posible.');
      setForm(initialFormState);
    } catch {
      setErrorMessage('No pudimos enviar el mensaje en este momento. Inténtalo nuevamente o revisa tus datos.');
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
        Cuéntanos qué quieres construir: sitio web, videojuego, animación, experiencia 3D, branding, automatización o una idea en
        exploración.
      </p>
      <p className="mt-3 max-w-4xl text-sm text-zinc-300 md:text-base">
        Al enviarnos tu mensaje, revisamos el alcance de tu proyecto y te respondemos con una orientación inicial para continuar.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="akai-card p-6">
          <h2 className="text-xl font-semibold text-white">¿Qué tipo de proyecto podemos evaluar?</h2>
          <ul className="mt-5 space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-red-300" aria-hidden="true" />
              <span>Desarrollo web y productos digitales.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-red-300" aria-hidden="true" />
              <span>Videojuegos, prototipos y experiencias interactivas.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-red-300" aria-hidden="true" />
              <span>Animación, modelado 3D, branding y contenido visual.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-red-300" aria-hidden="true" />
              <span>Automatización y soluciones apoyadas en inteligencia artificial.</span>
            </li>
          </ul>

          <div className="mt-6 rounded-xl border border-red-900/40 bg-black/35 p-4 text-sm text-zinc-300">
            <p className="font-semibold text-white">Para agilizar la respuesta incluye:</p>
            <p className="mt-2">objetivo del proyecto, etapa actual, alcance aproximado y fecha objetivo.</p>
          </div>

          <div className="mt-6 space-y-3 text-sm text-zinc-300">
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-red-300" />
              Contacto desde formulario
            </p>
            <p className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-red-300" />
              Tiempo de respuesta estimado: 24-48 horas hábiles
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link to="/services" className="akai-btn-secondary w-full">
              Volver a servicios
            </Link>
            <Link to="/trabajos" className="akai-btn-secondary w-full">
              Ver trabajos
            </Link>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.youtube.com/channel/UCyPRSLaqSn6jiuHRjz-952g/posts?pvf=CAE%253D"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
            <span
              role="img"
              aria-label="TikTok pendiente"
              title="Red oficial pendiente"
              aria-disabled="true"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-900/45 bg-black/35 text-zinc-500"
            >
              <FaTiktok className="h-5 w-5" />
            </span>
            <span
              role="img"
              aria-label="Instagram pendiente"
              title="Red oficial pendiente"
              aria-disabled="true"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-900/45 bg-black/35 text-zinc-500"
            >
              <FaInstagram className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-500">TikTok e Instagram oficiales: pendiente.</p>
        </section>

        <section id="contact-form" className="akai-panel p-6">
          <h2 className="text-xl font-semibold text-white">Formulario de contacto</h2>
          <p className="mt-2 text-sm text-zinc-300">Te responderemos con la siguiente acción recomendada para tu proyecto.</p>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
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
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                required
                className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
              {errors.name ? (
                <p id="contact-name-error" className="mt-1 text-xs text-red-200">
                  {errors.name}
                </p>
              ) : null}
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
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                required
                className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
              {errors.email ? (
                <p id="contact-email-error" className="mt-1 text-xs text-red-200">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Teléfono (opcional)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => handleChange('phone', event.target.value)}
                  placeholder="+57..."
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
                />
                {errors.phone ? (
                  <p id="contact-phone-error" className="mt-1 text-xs text-red-200">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Asunto o tipo de proyecto
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(event) => handleChange('subject', event.target.value)}
                  placeholder="Ej. Sitio web corporativo"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
                />
                {errors.subject ? (
                  <p id="contact-subject-error" className="mt-1 text-xs text-red-200">
                    {errors.subject}
                  </p>
                ) : null}
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
                placeholder="Describe qué quieres construir, objetivo y alcance aproximado."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                required
                minLength={MIN_MESSAGE_LENGTH}
                className="h-32 w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
              {errors.message ? (
                <p id="contact-message-error" className="mt-1 text-xs text-red-200">
                  {errors.message}
                </p>
              ) : null}
            </div>

            {successMessage ? (
              <p className="rounded-xl border border-emerald-500/45 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-200">
                {successMessage}
              </p>
            ) : null}
            {errorMessage ? (
              <p className="rounded-xl border border-red-700/60 bg-red-950/30 px-4 py-2 text-sm text-red-200">{errorMessage}</p>
            ) : null}

            <button type="submit" disabled={loading} className="akai-btn-primary w-full gap-2 disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? 'Enviando...' : 'Enviar mensaje'}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
