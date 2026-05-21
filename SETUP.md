# Albaraa OS — Setup Guide

## Overview

This is the foundational architecture and design system for **Albaraa OS — AI Software Lab**, a premium, futuristic portfolio experience.

**Phase 1 Status**: ✅ Foundation & Design System Complete
- Architecture established
- Design tokens defined
- Component system ready
- Animation framework configured
- Loading screen framework prepared
- AI Core foundation component ready

## Prerequisites

- **Node.js**: 18.17 or higher
- **npm**: 10.0 or higher (or yarn/pnpm)
- **Git**: For version control
- A modern code editor (VS Code recommended)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- **Next.js 15** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion 11** — Animation library
- **Lucide React** — Icon system
- Development tools (ESLint, Prettier)

### 2. Environment Setup

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Configure any API keys or feature flags as needed.

### 3. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata & styles
│   ├── page.tsx                 # Home page (foundation)
│   ├── loading.tsx              # Loading screen framework
│   ├── error.tsx                # Error boundary
│   └── not-found.tsx            # 404 page
│
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── GlassPanel.tsx      # Glassmorphism panels
│   │   ├── Button.tsx          # Premium buttons
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── Container.tsx       # Responsive container
│   │   └── ...
│   ├── animations/              # Animation components
│   ├── ai-core/                 # AI Core components
│   │   └── AICoreSphere.tsx    # Core visual component
│   └── sections/                # Page sections (future)
│
├── lib/
│   ├── motion/
│   │   └── variants.ts         # Framer Motion animation variants
│   ├── utils/
│   │   └── cn.ts               # Class name utility
│   └── ...
│
├── hooks/
│   └── useAnimationState.ts    # Custom animation hooks
│
├── styles/
│   └── globals.css             # Global styles & CSS variables
│
├── config/
│   └── design-tokens.ts        # Design system constants
│
├── types/
│   └── index.ts                # Global TypeScript definitions
│
├── public/
│   ├── assets/                 # Image & media assets
│   └── images/
│
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.js           # PostCSS configuration
├── .eslintrc.json              # ESLint rules
└── .prettierrc                 # Prettier formatting rules
```

## Development Workflow

### Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build            # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run type-check      # Check TypeScript types

# All together
npm run lint && npm run format && npm run type-check
```

### Code Style

The project enforces:
- **TypeScript** for type safety
- **Prettier** for code formatting
- **ESLint** for linting
- **Tailwind CSS** for styling

Run `npm run format` before committing to maintain consistency.

## Design System

### Color Palette

**Backgrounds**:
- Primary: `#0a0e27`
- Secondary: `#0f1229`
- Tertiary: `#151a3a`

**Accents** (Neon/Holographic):
- Cyan: `#00d9ff`
- Green: `#00ff9f`
- Pink: `#ff006e`
- Purple: `#b537f2`

### Typography

- **Font Family**: System fonts (Apple-like)
- **Heading Weights**: 600-700
- **Body Weight**: 400
- **Mono Font**: SF Mono, Monaco, etc.

### Spacing Scale

Uses Tailwind's standard spacing scale (4px base):
- `1` = 0.25rem (4px)
- `4` = 1rem (16px)
- `8` = 2rem (32px)
- etc.

### Border Radius

- `sm`: 0.375rem
- `md`: 0.75rem
- `lg`: 1rem
- `xl`: 1.5rem
- `glass`: 1.5rem (glassmorphism default)

### Animation System

**Durations**:
- `fast`: 150ms
- `base`: 300ms
- `slow`: 500ms

**Easing Functions**:
- `ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)`
- `ease-out`: `cubic-bezier(0, 0, 0.2, 1)`

## Key Components

### GlassPanel
Glassmorphism panel with optional glow and interactivity.

```tsx
<GlassPanel variant="md" interactive glow>
  Content here
</GlassPanel>
```

### Button
Premium button with multiple variants.

```tsx
<Button variant="primary" size="lg" glow>
  Click me
</Button>
```

### Container
Responsive container for content.

```tsx
<Container size="lg">
  Max-width content
</Container>
```

### AICoreSphere
Futuristic AI Core visual component.

```tsx
<AICoreSphere size="lg" glow interactive />
```

## Animation Framework

Reusable Framer Motion variants in `lib/motion/variants.ts`:

- `fadeInVariants`
- `fadeInUpVariants`
- `scaleInVariants`
- `glowVariants`
- `floatVariants`
- `containerVariants` + `itemVariants` (for staggered lists)
- `pageTransitionVariants`

Example usage:

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUpVariants}
>
  Animated content
</motion.div>
```

## Responsive Design

Breakpoints:
- `xs`: 320px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Use Tailwind's responsive prefixes:

```tsx
<div className="px-4 md:px-8 lg:px-12">
  Responsive padding
</div>
```

## Performance Optimization

### Already Configured

- ✅ Image optimization
- ✅ Font loading strategy
- ✅ CSS minification
- ✅ JavaScript code splitting
- ✅ SEO metadata setup
- ✅ Security headers

### Best Practices

1. **Use Next.js Image component** for image optimization
2. **Lazy load components** with `dynamic()` when appropriate
3. **Optimize animations** — avoid excessive DOM updates
4. **Test on mobile** — mobile-first development
5. **Monitor Core Web Vitals** with Vercel Analytics

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Configure environment variables
4. Deploy automatically on push

```bash
# One-time setup
npm install -g vercel
vercel
```

### Alternative: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Next Steps (Phase 2 & Beyond)

### Phase 2: Content & Pages
- [ ] Projects showcase page
- [ ] About/biography section
- [ ] Skills & expertise grid
- [ ] Contact form

### Phase 3: Interactive Features
- [ ] 3D animations (optional React Three Fiber)
- [ ] Smooth scrolling (Lenis)
- [ ] Advanced loading sequences
- [ ] Interactive particles

### Phase 4: Polish & Launch
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Performance auditing
- [ ] Mobile testing
- [ ] A/B testing setup

## Troubleshooting

### Port 3000 Already in Use

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Node Modules Issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Appearing

1. Restart dev server
2. Check `tailwind.config.ts` content paths
3. Clear `.next` directory: `rm -rf .next`

### TypeScript Errors

```bash
npm run type-check
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

For issues or questions:
1. Check documentation first
2. Search existing issues on GitHub
3. Review code comments in relevant files
4. Create a detailed issue report

---

**Ready to build?** Start with `npm run dev` and explore the foundational architecture!
