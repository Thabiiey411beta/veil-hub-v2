# 🌑 Veil Hub UI/UX Design System

## Bio-Digital Futurism Aesthetic

A premium, high-end DeFi interface combining dark mode elegance with gold accents and futuristic animations.

---

## 🎨 Design Philosophy

### Core Principles

1. **Premium & Trustworthy** - Clean, professional interface with clear data hierarchy
2. **Efficient** - Minimal cognitive load, intuitive navigation
3. **Mysterious & Futuristic** - Subtle animations, flowing lines, network visualizations
4. **Privacy-First** - Dark theme emphasizes security and confidentiality

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Background** | `#0A0A0A` | Primary dark background |
| **Surface** | `#1a1a2e` | Secondary surfaces, gradients |
| **Accent** | `#FFD700` | Gold - CTAs, highlights, borders |
| **Text Primary** | `#E0E0E0` | Main text content |
| **Text Secondary** | `#808080` | Muted text, labels |
| **Border** | `#FFD700/20` | Subtle borders |

---

## 📐 Layout System

### Grid Structure

- **Mobile-First**: Responsive design starting from 320px
- **Breakpoints**: 
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### Spacing Scale

```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Component Sizing

- **Cards**: Min 300px, responsive to container
- **Buttons**: 44px minimum height (accessibility)
- **Inputs**: 40px height with 16px padding
- **Icons**: 16px, 24px, 32px, 48px

---

## 🎭 Typography

### Font Stack

```css
font-family: 'Inter', 'Rajdhani', sans-serif;
```

### Type Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| **H1** | 48px | 700 | Page titles |
| **H2** | 36px | 700 | Section headers |
| **H3** | 24px | 600 | Subsections |
| **Body** | 16px | 400 | Main content |
| **Small** | 14px | 400 | Secondary text |
| **Tiny** | 12px | 500 | Labels, badges |

### Line Heights

- Headings: 1.2
- Body: 1.6
- Compact: 1.4

---

## 🎬 Animations & Transitions

### Timing Functions

```css
ease-out: cubic-bezier(0.4, 0, 0.2, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.6, 1)
ease-linear: linear
```

### Duration Standards

- **Quick**: 150ms (hover effects)
- **Standard**: 300ms (transitions)
- **Slow**: 500ms (page transitions)
- **Very Slow**: 2000ms+ (animations)

### Key Animations

#### Pulse
```css
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```
Used for: Active states, live indicators

#### Float
```css
animation: float 6s ease-in-out infinite;
```
Used for: Hero elements, network nodes

#### Shimmer
```css
animation: shimmer 2s infinite;
```
Used for: Loading states, data updates

#### Glow
```css
box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
```
Used for: Hover states, focus states

---

## 🧩 Component Library

### Buttons

#### Primary Button
```html
<button class="btn-primary">
  Launch App
</button>
```
- Background: Gold (#FFD700)
- Text: Dark (#0A0A0A)
- Hover: Lighter gold (#FFF700)
- Shadow: Gold glow on hover

#### Secondary Button
```html
<button class="btn-secondary">
  View Docs
</button>
```
- Border: Gold
- Text: Gold
- Hover: Gold background with opacity

#### Ghost Button
```html
<button class="btn-ghost">
  Learn More
</button>
```
- No background
- Text: Gold
- Hover: Lighter gold

### Cards

#### Standard Card
```html
<div class="card">
  <!-- Content -->
</div>
```
- Border: Gold with 20% opacity
- Hover: Border opacity 50%, background gold 5%
- Padding: 24px
- Border radius: 8px

### Inputs

#### Text Input
```html
<input class="input-primary" type="text" placeholder="Enter value" />
```
- Background: Gold 5% opacity
- Border: Gold 20% opacity
- Focus: Gold border, ring 30% opacity
- Padding: 8px 16px

### Badges

#### Gold Badge
```html
<span class="badge-gold">Active</span>
```
- Background: Gold 20% opacity
- Text: Gold
- Border: Gold 30% opacity

---

## 📊 Data Visualization

### Charts

- **Bar Charts**: Gradient from gold to transparent
- **Line Charts**: Gold strokes with area fill
- **Pie Charts**: Gold segments with opacity variations
- **Heatmaps**: Gold intensity scale

### Color Coding

- **Positive**: Gold (#FFD700)
- **Negative**: Red (#FF6B6B)
- **Neutral**: Gray (#808080)
- **Active**: Gold with glow
- **Inactive**: Gray with reduced opacity

---

## 🎯 Interactive Elements

### Hover States

All interactive elements should have:
1. **Border**: Increase opacity from 20% to 50%
2. **Background**: Add gold 5% opacity
3. **Shadow**: Add glow effect
4. **Cursor**: Change to pointer

### Focus States

For keyboard navigation:
1. **Ring**: 1px gold ring with 30% opacity
2. **Outline**: None (handled by ring)
3. **Visible**: Always visible for accessibility

### Active States

For selected/active elements:
1. **Background**: Gold 10% opacity
2. **Border**: Gold 100% opacity
3. **Text**: Gold color

---

## 📱 Responsive Design

### Mobile (< 768px)

- Single column layouts
- Full-width cards
- Larger touch targets (48px minimum)
- Simplified navigation
- Stacked metrics

### Tablet (768px - 1024px)

- 2-column layouts
- Balanced spacing
- Optimized for touch and mouse
- Sidebar navigation

### Desktop (> 1024px)

- Multi-column layouts
- Complex dashboards
- Hover effects enabled
- Sidebar + main content

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 for text
- **Focus Indicators**: Always visible
- **Keyboard Navigation**: Full support
- **Screen Readers**: Semantic HTML
- **Motion**: Respects `prefers-reduced-motion`

### Best Practices

1. Use semantic HTML (`<button>`, `<nav>`, `<main>`)
2. Include `aria-labels` for icons
3. Ensure form labels are associated
4. Provide alt text for images
5. Test with keyboard only
6. Test with screen readers

---

## 🚀 Performance

### Optimization Tips

1. **CSS**: Use Tailwind utilities for minimal CSS
2. **Animations**: Use `transform` and `opacity` for 60fps
3. **Images**: Optimize and lazy load
4. **Fonts**: Use system fonts or Google Fonts with `display=swap`
5. **Bundle**: Tree-shake unused styles

### Lighthouse Targets

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

---

## 📦 Component Examples

### Landing Page Hero

```tsx
<section className="min-h-[90vh] flex items-center justify-between px-8 py-20">
  <div className="max-w-2xl">
    <h1 className="text-6xl font-bold mb-6">
      The Final <span className="text-[#FFD700]">DeFi Organism</span>
    </h1>
    <p className="text-xl text-[#B0B0B0] mb-8">
      Zero-liquidation borrowing. Perpetual real yield.
    </p>
    <button className="btn-primary">Launch App</button>
  </div>
</section>
```

### Dashboard Metric Card

```tsx
<div className="card">
  <div className="flex justify-between items-start mb-4">
    <span className="text-[#808080] text-sm">Total Value Locked</span>
    <span className="text-[#FFD700]">◆</span>
  </div>
  <div className="text-2xl font-bold mb-2">$245M</div>
  <div className="text-xs text-[#FFD700]">↑ 12.5%</div>
</div>
```

### Trading Interface

```tsx
<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  {/* Sidebar */}
  <div className="card h-fit">
    {/* Trading pairs */}
  </div>
  
  {/* Main content */}
  <div className="lg:col-span-2 space-y-6">
    {/* Chart */}
    {/* Order book */}
  </div>
  
  {/* Order form */}
  <div className="card h-fit">
    {/* Form fields */}
  </div>
</div>
```

---

## 🔄 State Management

### Loading State

```tsx
<div className="shimmer h-12 rounded-lg" />
```

### Error State

```tsx
<div className="border border-red-500/50 bg-red-500/10 rounded-lg p-4">
  <p className="text-red-400">Error message</p>
</div>
```

### Success State

```tsx
<div className="border border-green-500/50 bg-green-500/10 rounded-lg p-4">
  <p className="text-green-400">Success message</p>
</div>
```

---

## 🎓 Design Tokens

### Exported as CSS Variables

```css
:root {
  --color-bg-primary: #0A0A0A;
  --color-bg-secondary: #1a1a2e;
  --color-accent: #FFD700;
  --color-text-primary: #E0E0E0;
  --color-text-secondary: #808080;
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  --shadow-glow: 0 0 20px rgba(255, 215, 0, 0.3);
}
```

---

## 📚 Resources

- **Tailwind CSS**: https://tailwindcss.com
- **Inter Font**: https://rsms.me/inter/
- **Rajdhani Font**: https://www.indiantypefoundry.com/fonts/rajdhani
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## 🌑 Welcome to the Darkness

This design system represents the premium, futuristic aesthetic of Veil Hub. Every element is crafted to inspire confidence, clarity, and a sense of entering a new era of DeFi.

**Built for the sophisticated investor. Designed for the future.**
