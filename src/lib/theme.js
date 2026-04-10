export const FONT_FAMILIES = {
  sans: { name: 'Sans', class: 'font-sans' },
  serif: { name: 'Serif', class: 'font-serif' },
  mono: { name: 'Mono', class: 'font-mono' },
  display: { name: 'Display', class: 'font-display' },
};

export const FONT_SIZES = {
  small: { name: 'Small', class: 'text-sm' },
  medium: { name: 'Medium', class: 'text-base' },
  large: { name: 'Large', class: 'text-lg' },
};

export const BORDER_RADIUS = {
  none: { name: 'None', class: 'rounded-none' },
  sm: { name: 'Small', class: 'rounded-sm' },
  md: { name: 'Medium', class: 'rounded-md' },
  lg: { name: 'Large', class: 'rounded-lg' },
  xl: { name: 'Extra Large', class: 'rounded-xl' },
};

export const ANIMATION_INTENSITY = {
  reduced: { name: 'Reduced', duration: 0.1 },
  normal: { name: 'Normal', duration: 0.3 },
  high: { name: 'High', duration: 0.6 },
};

export const LAYOUT_DENSITY = {
  compact: { name: 'Compact', spacing: 'gap-2' },
  comfortable: { name: 'Comfortable', spacing: 'gap-4' },
  spacious: { name: 'Spacious', spacing: 'gap-6' },
};

export const BLUR_INTENSITY = {
  xs: 'backdrop-blur-xs',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
  '2xl': 'backdrop-blur-2xl',
};

export const ACCENT_COLORS = [
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f97316', // Orange
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#f59e0b', // Amber
  '#ef4444', // Red
];