import { usePreferencesStore } from '../store/preferencesStore';
import { useEffect } from 'react';

export function usePreferences() {
  const preferences = usePreferencesStore();

  // Apply dark mode to document
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (preferences.darkMode === 'dark') {
      htmlElement.classList.add('dark');
    } else if (preferences.darkMode === 'light') {
      htmlElement.classList.remove('dark');
    } else {
      // System mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }, [preferences.darkMode]);

  return preferences;
}