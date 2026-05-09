const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: 'Desarrollo web',
      slug: 'desarrollo-web',
      description: 'Sitios, plataformas y aplicaciones modernas.',
    },
    {
      name: 'Videojuegos',
      slug: 'videojuegos',
      description: 'Concepto, prototipado y desarrollo de juegos.',
    },
    {
      name: 'Animacion 2D/3D',
      slug: 'animacion-2d-3d',
      description: 'Produccion audiovisual y narrativa visual.',
    },
    {
      name: 'Modelado 3D',
      slug: 'modelado-3d',
      description: 'Assets y visualizaciones tridimensionales.',
    },
    {
      name: 'Inteligencia artificial',
      slug: 'inteligencia-artificial',
      description: 'Automatizacion y experiencias inteligentes.',
    },
    {
      name: 'Branding y contenido digital',
      slug: 'branding-contenido-digital',
      description: 'Identidad visual y contenido de marca.',
    },
  ];

  const services = [
    {
      title: 'Desarrollo web',
      slug: 'desarrollo-web',
      description: 'Creamos sitios web, landing pages, plataformas y aplicaciones escalables para empresas.',
      deliverables: ['Arquitectura frontend/backend', 'Interfaces responsivas y optimizadas'],
      iconName: 'Code2',
      isActive: true,
      sortOrder: 1,
    },
    {
      title: 'Videojuegos',
      slug: 'videojuegos',
      description: 'Disenamos y desarrollamos experiencias de juego desde concepto hasta prototipo funcional.',
      deliverables: ['Diseno de mecanicas', 'Prototipos jugables y direccion visual'],
      iconName: 'Gamepad2',
      isActive: true,
      sortOrder: 2,
    },
    {
      title: 'Animacion 2D/3D',
      slug: 'animacion-2d-3d',
      description: 'Producimos piezas animadas para contenido de marca, productos y entretenimiento.',
      deliverables: ['Animaciones para contenido', 'Storytelling visual'],
      iconName: 'Clapperboard',
      isActive: true,
      sortOrder: 3,
    },
    {
      title: 'Modelado 3D',
      slug: 'modelado-3d',
      description: 'Desarrollamos assets y escenas 3D para productos, experiencias y medios digitales.',
      deliverables: ['Assets y entornos 3D', 'Optimizacion para uso interactivo'],
      iconName: 'Boxes',
      isActive: true,
      sortOrder: 4,
    },
    {
      title: 'Inteligencia artificial',
      slug: 'inteligencia-artificial',
      description: 'Exploramos soluciones con IA para automatizacion de flujos y nuevos productos.',
      deliverables: ['Prototipos con IA', 'Automatizacion de tareas'],
      iconName: 'Bot',
      isActive: true,
      sortOrder: 5,
    },
    {
      title: 'Branding y contenido digital',
      slug: 'branding-contenido-digital',
      description: 'Construimos identidad visual y contenido multimedia con enfoque estrategico.',
      deliverables: ['Sistema visual de marca', 'Contenido para comunicacion digital'],
      iconName: 'Palette',
      isActive: true,
      sortOrder: 6,
    },
  ];

  const projects = [
    {
      title: 'Yorurei Studio Web',
      slug: 'yorurei-studio-web',
      category: 'Desarrollo web',
      shortDescription: 'Sitio institucional de Yorurei Studio para presentar servicios, proyectos y posicionamiento.',
      longDescription: 'Plataforma corporativa para comunicar oferta de valor del estudio creativo y tecnologico.',
      status: 'published',
      coverImageUrl: '/images/Logo/Logo.png',
      technologies: ['React', 'Vite', 'Tailwind', 'UI/UX'],
      featured: true,
      sortOrder: 1,
      publishedAt: new Date(),
    },
    {
      title: 'Kaleido Lab',
      slug: 'kaleido-lab',
      category: 'Modelado 3D',
      shortDescription: 'Sistema colaborativo para revision y gestion de modelos 3D.',
      longDescription: 'Herramienta web para control de versiones y flujos de aprobacion en proyectos 3D.',
      status: 'published',
      coverImageUrl: '/images/1013143.png',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma', '3D'],
      featured: true,
      sortOrder: 2,
      publishedAt: new Date(),
    },
    {
      title: 'DISSAU Wallet',
      slug: 'dissau-wallet',
      category: 'Desarrollo web',
      shortDescription: 'Modulo de billetera digital con transferencias e historial de movimientos.',
      longDescription: 'Producto fintech con enfoque en experiencia de usuario, seguridad y trazabilidad.',
      status: 'published',
      coverImageUrl: '/images/123.png',
      technologies: ['.NET', 'React', 'API REST', 'Wallet'],
      featured: false,
      sortOrder: 3,
      publishedAt: new Date(),
    },
    {
      title: 'EMCALI CMS',
      slug: 'emcali-cms',
      category: 'Branding y contenido digital',
      shortDescription: 'CMS con flujo editorial y automatizacion de publicaciones.',
      longDescription: 'Sistema orientado a equipos de contenido con historial de revisiones y publicacion programada.',
      status: 'draft',
      coverImageUrl: '/images/LogoAkai.png',
      technologies: ['React', 'Node.js', 'CMS', 'Editorial Flow'],
      featured: false,
      sortOrder: 4,
      publishedAt: null,
    },
    {
      title: 'Conceptos de videojuegos',
      slug: 'conceptos-videojuegos',
      category: 'Videojuegos',
      shortDescription: 'Exploracion de ideas, mecanicas y prototipos para entretenimiento digital.',
      longDescription: 'Linea de investigacion y desarrollo para experiencias jugables futuras.',
      status: 'coming_soon',
      coverImageUrl: '/images/1013143.png',
      technologies: ['Game Dev', 'Narrativa', '3D', 'IA'],
      featured: true,
      sortOrder: 5,
      publishedAt: null,
    },
  ];

  const products = [
    {
      title: 'Plantilla web corporativa',
      slug: 'plantilla-web-corporativa',
      type: 'template',
      shortDescription: 'Base web corporativa lista para personalizacion empresarial.',
      longDescription: 'Plantilla adaptable para presencia digital profesional con paginas clave incluidas.',
      priceLabel: 'Desde USD 499',
      status: 'published',
      coverImageUrl: '/images/Logo/Logo.png',
      galleryUrls: ['/images/Logo/Logo.png'],
      tags: ['web', 'corporativo', 'template'],
      featured: true,
      sortOrder: 1,
      publishedAt: new Date(),
    },
    {
      title: 'Prototipo de videojuego',
      slug: 'prototipo-videojuego',
      type: 'game',
      shortDescription: 'Servicio-producto para validar mecanicas y experiencia de juego.',
      longDescription: 'Incluye definicion de loop jugable, arte base y pruebas tempranas.',
      priceLabel: 'Desde USD 1,200',
      status: 'coming_soon',
      coverImageUrl: '/images/1013143.png',
      galleryUrls: ['/images/1013143.png'],
      tags: ['game-dev', 'prototipo'],
      featured: true,
      sortOrder: 2,
      publishedAt: null,
    },
    {
      title: 'Paquete branding inicial',
      slug: 'paquete-branding-inicial',
      type: 'branding',
      shortDescription: 'Kit inicial para identidad de marca y contenido digital.',
      longDescription: 'Incluye lineamientos visuales, piezas base y assets para lanzamiento digital.',
      priceLabel: 'Desde USD 650',
      status: 'published',
      coverImageUrl: '/images/123.png',
      galleryUrls: ['/images/123.png'],
      tags: ['branding', 'contenido'],
      featured: false,
      sortOrder: 3,
      publishedAt: new Date(),
    },
    {
      title: 'Visualizacion 3D de producto',
      slug: 'visualizacion-3d-producto',
      type: '3d',
      shortDescription: 'Visualizacion 3D para presentaciones comerciales y ecommerce.',
      longDescription: 'Renderizado y assets optimizados para uso web y marketing digital.',
      priceLabel: 'Cotizacion personalizada',
      status: 'draft',
      coverImageUrl: '/images/LogoAkai.png',
      galleryUrls: ['/images/LogoAkai.png'],
      tags: ['3d', 'producto', 'visualizacion'],
      featured: false,
      sortOrder: 4,
      publishedAt: null,
    },
  ];

  await prisma.$transaction(
    categories.map((item) =>
      prisma.category.upsert({
        where: { slug: item.slug },
        update: item,
        create: item,
      }),
    ),
  );

  await prisma.$transaction(
    services.map((item) =>
      prisma.service.upsert({
        where: { slug: item.slug },
        update: item,
        create: item,
      }),
    ),
  );

  await prisma.$transaction(
    projects.map((item) =>
      prisma.project.upsert({
        where: { slug: item.slug },
        update: item,
        create: item,
      }),
    ),
  );

  await prisma.$transaction(
    products.map((item) =>
      prisma.product.upsert({
        where: { slug: item.slug },
        update: item,
        create: item,
      }),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('[seed] Error:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
