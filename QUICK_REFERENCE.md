# Albaraa OS — Quick Reference Guide

**TL;DR** for developers who just want to start coding.

---

## 🚀 Quick Start (2 minutes)

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 📁 Where Things Are

| What | Where |
|------|-------|
| Pages | `app/*.tsx` |
| UI Components | `components/ui/` |
| Layout Components | `components/layout/` |
| Animations | `lib/motion/variants.ts` |
| Design Tokens | `config/design-tokens.ts` |
| Global Styles | `styles/globals.css` |
| Types | `types/index.ts` |
| Hooks | `hooks/*.ts` |

---

## 🎨 Colors

```typescript
// Use design tokens
import { colors } from "@/config/design-tokens";

// Or Tailwind classes
className="text-accent-cyan bg-background-primary"
```

**Palette**:
- `accent-cyan` (#00d9ff)
- `accent-green` (#00ff9f)
- `accent-pink` (#ff006e)
- `accent-purple` (#b537f2)

---

## 🧩 Components

### Button
```tsx
<Button variant="primary" size="lg" glow>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `ghost`, `glass`
**Sizes**: `sm`, `md`, `lg`

### GlassPanel
```tsx
<GlassPanel variant="lg" interactive glow>
  Content
</GlassPanel>
```

**Variants**: `sm`, `md`, `lg`

### Container
```tsx
<Container size="lg">
  Max-width content
</Container>
```

**Sizes**: `sm`, `md`, `lg`, `full`

### AICoreSphere
```tsx
<AICoreSphere size="lg" glow interactive />
```

**Sizes**: `sm`, `md`, `lg`

---

## ✨ Animations

### Fade In + Slide Up
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUpVariants}
>
  Content
</motion.div>
```

### Glow Hover
```tsx
<motion.button
  variants={glowVariants}
  initial="rest"
  whileHover="hover"
>
  Hover me
</motion.button>
```

### Staggered List
```tsx
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

**Available Variants**: See `lib/motion/variants.ts` (20+ options)

---

## 📏 Spacing

Use Tailwind spacing scale (4px base):
```tsx
// Padding
<div className="p-4">         {/* 16px */}
<div className="px-6 py-4">   {/* 24px horizontal, 16px vertical */}

// Margin
<div className="mt-8 mb-4">   {/* 32px top, 16px bottom */}

// Gap
<div className="flex gap-4">  {/* 16px gap */}
```

**Scale**: `0.25rem` (1) → `4rem` (64)

---

## 🎯 Classes to Remember

```tsx
// Glass panels
<div className="glass-panel">

// Glow text
<h1 className="glow-cyan">Glowing text</h1>

// Animations
<div className="animate-fade-in">

// Shadows
<div className="shadow-glass-lg">

// Responsive
<div className="px-4 md:px-8 lg:px-12">
```

---

## 🔧 Commands

```bash
npm run dev         # Development server
npm run build       # Production build
npm run start       # Run production build
npm run lint        # Check code
npm run format      # Format code
npm run type-check  # TypeScript check
```

---

## 📝 TypeScript

Strict mode enabled. Always use types:

```typescript
interface MyProps {
  title: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function MyComponent({ title, onClick, variant = "primary" }: MyProps) {
  return <button onClick={onClick}>{title}</button>;
}
```

---

## 🎬 Animation Timing

```typescript
durations: {
  fast:    150,
  base:    300,  // default
  slow:    500,
  slower:  800,
  slowest: 1200,
}

easings: {
  out: "cubic-bezier(0, 0, 0.2, 1)",  // most common
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
}
```

---

## 📱 Responsive Breakpoints

```tsx
// Mobile-first
<div className="text-base md:text-lg lg:text-2xl">
  Text size grows on bigger screens
</div>

// Or show/hide
<div className="hidden md:block">
  Visible only on desktop
</div>
```

**Breakpoints**:
- `sm`: 640px
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large)
- `2xl`: 1536px (ultra-wide)

---

## 🎨 Make a New Component

1. Create in `components/ui/MyComponent.tsx`
2. Use TypeScript interface for props
3. Forward ref if needed
4. Use design tokens
5. Export from component

```typescript
import { cn } from "@/lib/utils/cn";

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("base-classes", variant && "variant-styles", className)}
        {...props}
      />
    );
  }
);

MyComponent.displayName = "MyComponent";
```

---

## 🎯 Add a New Page

1. Create file in `app/[name]/page.tsx`
2. Make it a client or server component
3. Use Container for layout
4. Import components
5. Add motion animations

```typescript
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { pageTransitionVariants } from "@/lib/motion/variants";

export default function MyPage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={pageTransitionVariants}
    >
      <Container>
        <GlassPanel>
          <h1>My Page</h1>
        </GlassPanel>
      </Container>
    </motion.main>
  );
}
```

---

## 💾 Use Design Tokens

```typescript
import { colors, spacing, motion } from "@/config/design-tokens";

// Colors
backgroundColor: colors.accent.cyan,
color: colors.background.primary,

// Motion
transition: motion.transitions.smooth,
duration: motion.durations.base,

// Or just use Tailwind!
className="bg-accent-cyan text-background-primary"
```

---

## 🐛 Debugging

```bash
# Type check
npm run type-check

# Lint issues
npm run lint

# Format to fix
npm run format

# Dev tools
Chrome DevTools (F12)
React DevTools browser extension
```

---

## 📚 Full Docs

- **Setup**: `SETUP.md`
- **Architecture**: `ARCHITECTURE.md`
- **Summary**: `PHASE_1_SUMMARY.md`

---

## 🚀 Ready?

```bash
npm run dev
# Start building!
```

---

**That's it. Go make something beautiful.** ✨
