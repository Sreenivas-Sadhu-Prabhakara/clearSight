# ClearSight Visual Theme & Design System

## Color Palette

### Primary Colors
- **Primary Dark**: `#0f4c75` - Deep Ocean Blue (Primary brand color)
- **Primary Light**: `#1a6fa0` - Medium Ocean Blue
- **Primary Lighter**: `#3b82f6` - Light Blue

### Accent Colors
- **Accent Teal**: `#00d4ff` - Bright Cyan (Primary accent)
- **Accent Teal Dark**: `#00a8cc` - Darker Cyan
- **Accent Cyan**: `#1ee0c6` - Light Cyan Green

### Secondary & Status Colors
- **Secondary/Danger**: `#e63946` - Medical Red
- **Secondary Light**: `#f1566c` - Light Red
- **Success**: `#06a77d` - Medical Green
- **Success Light**: `#1ecfa4` - Light Green
- **Warning**: `#f77f00` - Medical Orange
- **Warning Light**: `#fcbf49` - Light Orange

### Neutral Colors
- **Dark**: `#0f1419` - Nearly Black
- **Light**: `#f5f7fa` - Off White
- **Light Alt**: `#e8eef5` - Light Blue Gray
- **Gray**: `#e9ecef` - Light Gray
- **Gray Dark**: `#d3d7df` - Medium Gray
- **Gray Darker**: `#b8bcc5` - Dark Gray

## Typography

### Headings
- **H1/H2**: 2.2-3.5rem, Font Weight 700, Letter Spacing -0.5px to -1px
- **H3**: 1.6rem, Font Weight 600
- **H4**: 1.25rem, Font Weight 600

### Body Text
- Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Font Size: 1rem (16px)
- Line Height: 1.6-1.8
- Color: #0f1419

## Visual Effects

### Box Shadows
- **Default**: `0 8px 16px rgba(15, 76, 117, 0.12)`
- **Large**: `0 20px 40px rgba(15, 76, 117, 0.2)`
- **Extra Large**: `0 25px 50px rgba(15, 76, 117, 0.25)`

### Border Radius
- **Standard**: 16px
- **Large**: 24px
- **Inputs/Buttons**: 8px

### Animations
- **Smooth Transitions**: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
- **Fast Transitions**: 0.2s ease
- **Hover Effects**: -4px to -12px translateY with scale 1.02-1.05

## Component Styles

### Cards
- White background with box-shadow
- 2.5rem padding
- 16px border-radius
- Top border: 4-5px in accent-teal
- Hover: -8px to -12px translateY, scale 1.02-1.05
- Smooth gradient on hover background

### Buttons
- Gradient backgrounds (primary to light variants)
- 0.9rem padding with 2rem horizontal
- Rounded 8px corners
- Hover: -4px translateY with larger shadow
- Icon support with flex layout

### Metrics/Stats
- Gradient text (primary to accent-teal)
- 2.8rem+ font size
- Semi-transparent backgrounds in hero
- Glass-morphism effects with backdrop-filter blur

### Hero Section
- Large gradient background (primary dark to teal)
- Animated slide-in effects for content
- Decorative SVG pattern background
- Radial gradient overlays for depth

## Spacing System
- 0.5rem (4px)
- 1rem (8px)
- 1.5rem (12px)
- 2rem (16px)
- 2.5rem (20px)
- 3rem (24px)
- 3.5rem (28px)
- 4rem (32px)

## Responsive Breakpoints
- **Desktop**: 1400px max-width containers
- **Tablet**: 768px media query
- **Mobile**: 480px media query

## Design Principles
1. **Medical Professionalism**: Ocean blue conveys trust and medical expertise
2. **Modern Clarity**: Clean typography and ample whitespace
3. **Energetic Accents**: Cyan/teal accents provide visual interest
4. **Accessibility**: High contrast ratios, clear hierarchy
5. **Immersive Interaction**: Smooth animations and hover effects
6. **Glass Morphism**: Subtle blurred backgrounds for depth
7. **Gradients**: Subtle directional gradients for visual interest

## Implementation Notes
- All transitions use cubic-bezier(0.4, 0, 0.2, 1) for smooth, natural motion
- Colors use rgba for transparency effects
- Shadows use primary color with opacity for cohesion
- Gradients flow 135deg (top-left to bottom-right) for consistency
- Animations trigger on scroll, hover, and page load
