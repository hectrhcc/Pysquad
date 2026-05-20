# PySquad — Sitio Web Oficial

> **Comunidad Tecnológica Independiente** — Aprende, comparte y conecta.

![PySquad](https://img.shields.io/badge/PySquad-Comunidad%20Tech-7c3aed?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06b6d4?style=for-the-badge&logo=tailwindcss)

## 🚀 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 15](https://nextjs.org) | Framework (App Router) |
| [TypeScript](https://www.typescriptlang.org) | Lenguaje (tipado estricto) |
| [Tailwind CSS](https://tailwindcss.com) | Estilos |
| [Lucide React](https://lucide.dev) | Iconos |
| [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) | Fuentes (Inter + Space Grotesk) |

## 📁 Estructura de Carpetas

```
pysquad/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fuentes, SEO, Header/Footer)
│   ├── page.tsx            # Landing page (Home)
│   ├── miembros/
│   │   └── page.tsx        # Directorio de miembros
│   └── eventos/
│       └── page.tsx        # Historial de eventos
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Header sticky con nav
│   │   └── Footer.tsx      # Footer con links sociales
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── PillarsSection.tsx
│   │   └── FeaturedEvent.tsx
│   ├── miembros/
│   │   ├── MemberCard.tsx
│   │   └── MemberFilter.tsx
│   └── eventos/
│       └── EventCard.tsx
├── data/
│   └── mockData.ts         # ← Agrega miembros y eventos aquí
├── types/
│   └── index.ts            # Interfaces TypeScript globales
└── lib/
    └── utils.ts            # Helpers (cn, formatDate, etc.)
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Linter
npm run lint
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🤝 Cómo Contribuir

¡Las contribuciones son bienvenidas! Este proyecto es Open Source y parte de la comunidad PySquad.

### Agregar un Miembro

Edita [`data/mockData.ts`](./data/mockData.ts) y agrega un objeto al array `members` siguiendo la interfaz `Member` de [`types/index.ts`](./types/index.ts):

```typescript
{
  id: "member-XXX",           // ID único
  name: "Tu Nombre",
  role: "Tu Rol / Especialidad",
  bio: "Una descripción corta de ti.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TuNombre",
  technologies: ["React", "TypeScript"], // Ver TechTag en types/index.ts
  social: {
    github: "https://github.com/tu-usuario",
    linkedin: "https://linkedin.com/in/tu-perfil",
  },
}
```

### Agregar un Evento

Agrega un objeto al array `events` siguiendo la interfaz `Event`:

```typescript
{
  id: "event-XXX",
  title: "Título de la charla",
  description: "Descripción del evento.",
  date: "2025-08-20",       // ISO 8601
  time: "18:00",
  location: "Lugar del evento",
  speaker: "Nombre del speaker",
  speakerRole: "Rol del speaker",
  category: "Web",          // Ver EventCategory en types/index.ts
  status: "past",           // "past" | "upcoming"
  slidesUrl: "https://...", // Opcional
  repoUrl: "https://...",   // Opcional
}
```

### Pull Requests

1. Fork del repositorio
2. Crea una rama: `git checkout -b feat/agregar-mi-perfil`
3. Haz tus cambios y haz commit: `git commit -m "feat: agrego perfil de [Tu Nombre]"`
4. Push: `git push origin feat/agregar-mi-perfil`
5. Abre un Pull Request

## 📄 Licencia

MIT — Hecho con ❤️ por la comunidad PySquad.
