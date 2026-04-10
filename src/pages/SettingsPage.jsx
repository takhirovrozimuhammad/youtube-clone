import React from 'react';
import { motion } from 'framer-motion';
import { usePreferencesStore } from '../store/preferencesStore';
import { usePreferences } from '../hooks/usePreferences';
import { FONT_FAMILIES, FONT_SIZES, BORDER_RADIUS, ANIMATION_INTENSITY, LAYOUT_DENSITY, BLUR_INTENSITY, ACCENT_COLORS } from '../lib/theme';
import { Button } from '../components/ui/Button';
import { Slider } from '../components/ui/Slider';
import { Chip } from '../components/ui/Chip';
import { Palette, Type, Layout, Zap } from 'lucide-react';

export default function SettingsPage() {
  const preferences = usePreferences();
  const store = usePreferencesStore();

  const PRESETS = store.getPresets();

  const SettingGroup = ({ title, icon: Icon, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-lg p-6 space-y-4 shadow-md"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-4xl mx-auto space-y-8"
    >
      {/* Page Title */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }}>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Customize your PremiumWatch experience</p>
      </motion.div>

      {/* Presets */}
      <SettingGroup title="Presets" icon={Palette}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <Button
              key={key}
              variant={preferences.accentColor === preset.accentColor ? 'primary' : 'secondary'}
              fullWidth
              onClick={() => store.applyPreset(key)}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </SettingGroup>

      {/* Appearance */}
      <SettingGroup title="Appearance" icon={Palette}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Accent Color
            </label>
            <div className="flex gap-3 flex-wrap">
              {ACCENT_COLORS.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => store.setAccentColor(color)}
                  className="w-10 h-10 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: color,
                    borderColor: preferences.accentColor === color ? '#000' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dark Mode
            </label>
            <div className="flex gap-2">
              {['light', 'dark', 'system'].map((mode) => (
                <Chip
                  key={mode}
                  isActive={preferences.darkMode === mode}
                  onClick={() => store.setDarkMode(mode)}
                  className="capitalize"
                >
                  {mode}
                </Chip>
              ))}
            </div>
          </div>

          <Slider
            label="Blur Intensity"
            min={0}
            max={5}
            value={Object.keys(BLUR_INTENSITY).indexOf(preferences.blurIntensity)}
            onChange={(val) => {
              const keys = Object.keys(BLUR_INTENSITY);
              store.setBlurIntensity(keys[val]);
            }}
          />
        </div>
      </SettingGroup>

      {/* Typography */}
      <SettingGroup title="Typography" icon={Type}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Family
            </label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(FONT_FAMILIES).map(([key, { name }]) => (
                <Chip
                  key={key}
                  isActive={preferences.fontFamily === key}
                  onClick={() => store.setFontFamily(key)}
                >
                  {name}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Size
            </label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(FONT_SIZES).map(([key, { name }]) => (
                <Chip
                  key={key}
                  isActive={preferences.fontSize === key}
                  onClick={() => store.setFontSize(key)}
                >
                  {name}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </SettingGroup>

      {/* Layout */}
      <SettingGroup title="Layout" icon={Layout}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Border Radius
            </label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(BORDER_RADIUS).map(([key, { name }]) => (
                <Chip
                  key={key}
                  isActive={preferences.borderRadius === key}
                  onClick={() => store.setBorderRadius(key)}
                >
                  {name}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Layout Density
            </label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(LAYOUT_DENSITY).map(([key, { name }]) => (
                <Chip
                  key={key}
                  isActive={preferences.layoutDensity === key}
                  onClick={() => store.setLayoutDensity(key)}
                >
                  {name}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </SettingGroup>

      {/* Animation */}
      <SettingGroup title="Animation" icon={Zap}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Animation Intensity
            </label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(ANIMATION_INTENSITY).map(([key, { name }]) => (
                <Chip
                  key={key}
                  isActive={preferences.animationIntensity === key}
                  onClick={() => store.setAnimationIntensity(key)}
                >
                  {name}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </SettingGroup>
    </motion.div>
  );
}