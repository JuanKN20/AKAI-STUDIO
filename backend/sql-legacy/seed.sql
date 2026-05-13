-- Yorurei Studio initial seed data
-- Run after YorureiStudioDB.sql

INSERT INTO categories (name, slug, description)
VALUES
  ('Desarrollo web', 'desarrollo-web', 'Sitios, plataformas y aplicaciones modernas.'),
  ('Videojuegos', 'videojuegos', 'Concepto, prototipado y desarrollo de juegos.'),
  ('Animación 2D/3D', 'animacion-2d-3d', 'Producción audiovisual y narrativa visual.'),
  ('Modelado 3D', 'modelado-3d', 'Assets y visualizaciones tridimensionales.'),
  ('Inteligencia artificial', 'inteligencia-artificial', 'Automatización y experiencias inteligentes.'),
  ('Branding y contenido digital', 'branding-contenido-digital', 'Identidad visual y contenido de marca.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  updated_at = NOW();

INSERT INTO services (
  title,
  slug,
  description,
  deliverables,
  icon_name,
  is_active,
  sort_order
)
VALUES
  (
    'Desarrollo web',
    'desarrollo-web',
    'Creamos sitios web, landing pages, plataformas y aplicaciones escalables para empresas.',
    ARRAY['Arquitectura frontend/backend', 'Interfaces responsivas y optimizadas'],
    'Code2',
    TRUE,
    1
  ),
  (
    'Videojuegos',
    'videojuegos',
    'Diseñamos y desarrollamos experiencias de juego desde concepto hasta prototipo funcional.',
    ARRAY['Diseño de mecánicas', 'Prototipos jugables y dirección visual'],
    'Gamepad2',
    TRUE,
    2
  ),
  (
    'Animación 2D/3D',
    'animacion-2d-3d',
    'Producimos piezas animadas para contenido de marca, productos y entretenimiento.',
    ARRAY['Animaciones para contenido', 'Storytelling visual'],
    'Clapperboard',
    TRUE,
    3
  ),
  (
    'Modelado 3D',
    'modelado-3d',
    'Desarrollamos assets y escenas 3D para productos, experiencias y medios digitales.',
    ARRAY['Assets y entornos 3D', 'Optimización para uso interactivo'],
    'Boxes',
    TRUE,
    4
  ),
  (
    'Inteligencia artificial',
    'inteligencia-artificial',
    'Exploramos soluciones con IA para automatización de flujos y nuevos productos.',
    ARRAY['Prototipos con IA', 'Automatización de tareas'],
    'Bot',
    TRUE,
    5
  ),
  (
    'Branding y contenido digital',
    'branding-contenido-digital',
    'Construimos identidad visual y contenido multimedia con enfoque estratégico.',
    ARRAY['Sistema visual de marca', 'Contenido para comunicación digital'],
    'Palette',
    TRUE,
    6
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  deliverables = EXCLUDED.deliverables,
  icon_name = EXCLUDED.icon_name,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

INSERT INTO projects (
  title,
  slug,
  category,
  short_description,
  long_description,
  status,
  cover_image_url,
  demo_url,
  repository_url,
  technologies,
  featured,
  sort_order,
  published_at
)
VALUES
  (
    'Yorurei Studio Web',
    'yorurei-studio-web',
    'Desarrollo web',
    'Sitio institucional de Yorurei Studio para presentar servicios, proyectos y posicionamiento.',
    'Plataforma corporativa para comunicar oferta de valor del estudio creativo y tecnológico.',
    'published',
    '/images/1013143.png',
    NULL,
    NULL,
    ARRAY['React', 'Vite', 'Tailwind', 'UI/UX'],
    TRUE,
    1,
    NOW()
  ),
  (
    'Kaleido Lab',
    'kaleido-lab',
    'Modelado 3D',
    'Sistema colaborativo para revisión y gestión de modelos 3D.',
    'Herramienta web para control de versiones y flujos de aprobación en proyectos 3D.',
    'published',
    '/images/1013143.png',
    NULL,
    NULL,
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Prisma', '3D'],
    TRUE,
    2,
    NOW()
  ),
  (
    'DISSAU Wallet',
    'dissau-wallet',
    'Desarrollo web',
    'Módulo de billetera digital con transferencias e historial de movimientos.',
    'Producto fintech con enfoque en experiencia de usuario, seguridad y trazabilidad.',
    'published',
    '/images/123.png',
    NULL,
    NULL,
    ARRAY['.NET', 'React', 'API REST', 'Wallet'],
    FALSE,
    3,
    NOW()
  ),
  (
    'EMCALI CMS',
    'emcali-cms',
    'Branding y contenido digital',
    'CMS con flujo editorial y automatización de publicaciones.',
    'Sistema orientado a equipos de contenido con historial de revisiones y publicación programada.',
    'draft',
    '/images/123.png',
    NULL,
    NULL,
    ARRAY['React', 'Node.js', 'CMS', 'Editorial Flow'],
    FALSE,
    4,
    NULL
  ),
  (
    'Conceptos de videojuegos',
    'conceptos-videojuegos',
    'Videojuegos',
    'Exploración de ideas, mecánicas y prototipos para entretenimiento digital.',
    'Línea de investigación y desarrollo para experiencias jugables futuras.',
    'coming_soon',
    '/images/1013143.png',
    NULL,
    NULL,
    ARRAY['Game Dev', 'Narrativa', '3D', 'IA'],
    TRUE,
    5,
    NULL
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  status = EXCLUDED.status,
  cover_image_url = EXCLUDED.cover_image_url,
  demo_url = EXCLUDED.demo_url,
  repository_url = EXCLUDED.repository_url,
  technologies = EXCLUDED.technologies,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO products (
  title,
  slug,
  type,
  short_description,
  long_description,
  price_label,
  status,
  cover_image_url,
  gallery_urls,
  tags,
  featured,
  sort_order,
  published_at
)
VALUES
  (
    'Plantilla web corporativa',
    'plantilla-web-corporativa',
    'template',
    'Base web corporativa lista para personalización empresarial.',
    'Plantilla adaptable para presencia digital profesional con páginas clave incluidas.',
    'Desde USD 499',
    'published',
    '/images/123.png',
    ARRAY['/images/123.png'],
    ARRAY['web', 'corporativo', 'template'],
    TRUE,
    1,
    NOW()
  ),
  (
    'Prototipo de videojuego',
    'prototipo-videojuego',
    'game',
    'Servicio-producto para validar mecánicas y experiencia de juego.',
    'Incluye definición de loop jugable, arte base y pruebas tempranas.',
    'Desde USD 1,200',
    'coming_soon',
    '/images/1013143.png',
    ARRAY['/images/1013143.png'],
    ARRAY['game-dev', 'prototipo'],
    TRUE,
    2,
    NULL
  ),
  (
    'Paquete branding inicial',
    'paquete-branding-inicial',
    'branding',
    'Kit inicial para identidad de marca y contenido digital.',
    'Incluye lineamientos visuales, piezas base y assets para lanzamiento digital.',
    'Desde USD 650',
    'published',
    '/images/123.png',
    ARRAY['/images/123.png'],
    ARRAY['branding', 'contenido'],
    FALSE,
    3,
    NOW()
  ),
  (
    'Visualización 3D de producto',
    'visualizacion-3d-producto',
    '3d',
    'Visualización 3D para presentaciones comerciales y ecommerce.',
    'Renderizado y assets optimizados para uso web y marketing digital.',
    'Cotización personalizada',
    'draft',
    '/images/1013143.png',
    ARRAY['/images/1013143.png'],
    ARRAY['3d', 'producto', 'visualizacion'],
    FALSE,
    4,
    NULL
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  price_label = EXCLUDED.price_label,
  status = EXCLUDED.status,
  cover_image_url = EXCLUDED.cover_image_url,
  gallery_urls = EXCLUDED.gallery_urls,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();
