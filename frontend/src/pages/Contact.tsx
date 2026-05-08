import React from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Contact: React.FC = () => {
  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Contacto</p>
      </div>
      <h1 className="akai-section-title mt-3">Conversemos sobre tu próximo proyecto</h1>
      <p className="akai-section-subtitle">
        ¿Tienes una idea, proyecto o experiencia digital en mente? En Akai Studio podemos ayudarte
        a convertirla en una solución visual, interactiva y funcional.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="akai-card p-6">
          <h2 className="text-xl font-semibold text-white">Canales directos</h2>
          <div className="mt-5 space-y-4 text-sm text-zinc-300">
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-red-300" />
              contacto@akai-studio.dev
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
            <button type="button" className="akai-btn-primary w-full">
              Iniciar proyecto
            </button>
            <button type="button" className="akai-btn-secondary w-full">
              Solicitar información
            </button>
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
              href="https://www.tiktok.com/@akai_studio"
              aria-label="TikTok"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
            >
              <FaTiktok className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/akai__studio/"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </section>

        <section className="akai-panel p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Formulario de contacto</h2>
            <span className="rounded-full border border-red-500/40 bg-red-950/45 px-3 py-1 text-[11px] uppercase tracking-wide text-red-100">
              Vista inicial
            </span>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre de contacto"
                className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="correo@empresa.com"
                className="w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
                Mensaje
              </label>
              <textarea
                placeholder="Describe tu proyecto"
                className="h-32 w-full rounded-xl border border-red-900/35 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/70"
              />
            </div>

            <button type="button" className="akai-btn-primary w-full gap-2">
              Enviar mensaje
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-4 text-xs text-zinc-400">
            Nota: este formulario es visual y aún no está integrado con backend en esta fase.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
