import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Library, Settings } from 'lucide-react';
import { cn } from '../../lib/classNames';

const MENU_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Search', path: '/search' },
  { icon: Library, label: 'Library', path: '/library' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      initial={{ y: 64 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-40 lg:hidden"
    >
      <div className="h-full flex items-center justify-around">
        {MENU_ITEMS.map(({ icon: Icon, label, path }) => (
          <motion.button
            key={path}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(path)}
            className={cn(
              'flex flex-col items-center justify-center gap-1 py-2 px-3 flex-1 h-full transition-colors',
              isActive(path)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}