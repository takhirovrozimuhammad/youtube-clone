import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const PRESETS = {
  liquidGlass: {
    name: 'Liquid Glass',
    accentColor: '#3b82f6',
    fontFamily: 'sans',
    fontSize: 'medium',
    borderRadius: 'lg',
    animationIntensity: 'normal',
    layoutDensity: 'comfortable',
    blurIntensity: 'md',
    darkMode: 'dark',
    background: 'from-blue-50 to-indigo-100',
    glassOpacity: 0.7,
  },
  amoledCinema: {
    name: 'AMOLED Cinema',
    accentColor: '#fbbf24',
    fontFamily: 'display',
    fontSize: 'large',
    borderRadius: 'md',
    animationIntensity: 'reduced',
    layoutDensity: 'compact',
    blurIntensity: 'lg',
    darkMode: 'dark',
    background: 'from-black to-gray-900',
    glassOpacity: 0.9,
  },
  sunsetPremium: {
    name: 'Sunset Premium',
    accentColor: '#f97316',
    fontFamily: 'serif',
    fontSize: 'medium',
    borderRadius: 'xl',
    animationIntensity: 'high',
    layoutDensity: 'spacious',
    blurIntensity: 'sm',
    darkMode: 'light',
    background: 'from-orange-50 via-pink-50 to-red-50',
    glassOpacity: 0.5,
  },
  minimalPro: {
    name: 'Minimal Pro',
    accentColor: '#6366f1',
    fontFamily: 'mono',
    fontSize: 'small',
    borderRadius: 'none',
    animationIntensity: 'reduced',
    layoutDensity: 'compact',
    blurIntensity: 'xs',
    darkMode: 'light',
    background: 'from-white to-gray-50',
    glassOpacity: 0.3,
  },
};

export const usePreferencesStore = create(
  persist(
    (set) => ({
      // Theme settings
      accentColor: '#3b82f6',
      fontFamily: 'sans',
      fontSize: 'medium',
      borderRadius: 'lg',
      animationIntensity: 'normal',
      layoutDensity: 'comfortable',
      blurIntensity: 'md',
      darkMode: 'system',
      background: 'from-blue-50 to-indigo-100',
      glassOpacity: 0.7,

      // Actions
      setAccentColor: (color) => set({ accentColor: color }),
      setFontFamily: (family) => set({ fontFamily: family }),
      setFontSize: (size) => set({ fontSize: size }),
      setBorderRadius: (radius) => set({ borderRadius: radius }),
      setAnimationIntensity: (intensity) => set({ animationIntensity: intensity }),
      setLayoutDensity: (density) => set({ layoutDensity: density }),
      setBlurIntensity: (intensity) => set({ blurIntensity: intensity }),
      setDarkMode: (mode) => set({ darkMode: mode }),
      setBackground: (bg) => set({ background: bg }),
      setGlassOpacity: (opacity) => set({ glassOpacity: opacity }),

      applyPreset: (presetKey) => {
        const preset = PRESETS[presetKey];
        if (preset) {
          set({
            accentColor: preset.accentColor,
            fontFamily: preset.fontFamily,
            fontSize: preset.fontSize,
            borderRadius: preset.borderRadius,
            animationIntensity: preset.animationIntensity,
            layoutDensity: preset.layoutDensity,
            blurIntensity: preset.blurIntensity,
            darkMode: preset.darkMode,
            background: preset.background,
            glassOpacity: preset.glassOpacity,
          });
        }
      },

      getPresets: () => PRESETS,
    }),
    {
      name: 'premium-watch-preferences',
      version: 1,
    }
  )
);