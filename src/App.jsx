import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/common/AppShell';
import { usePreferences } from './hooks/usePreferences';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WatchPage from './pages/WatchPage';
import LibraryPage from './pages/LibraryPage';
import SettingsPage from './pages/SettingsPage';
import { cn } from './lib/classNames';

export default function App() {
  const preferences = usePreferences();

  return (
    <div
      className={cn(
        'font-sans',
        preferences.fontFamily === 'serif' && 'font-serif',
        preferences.fontFamily === 'mono' && 'font-mono',
        preferences.fontFamily === 'display' && 'font-display',
      )}
      style={{
        '--accent-color': preferences.accentColor,
        fontSize: preferences.fontSize === 'small' ? '14px' : preferences.fontSize === 'large' ? '18px' : '16px',
      }}
    >
      <Router>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watch/:videoId" element={<WatchPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </Router>
    </div>
  );
}