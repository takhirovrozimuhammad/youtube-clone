import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Library, Settings, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../lib/classNames';

const MENU_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Search', path: '/search' },
  { icon: Library, label: 'Library', path: '/library' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -256 }}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 overflow-y-auto lg:translate-x-0 lg:static lg:top-0 lg:h-screen"
      >
        <div className="p-6 space-y-2">
          {/* Close button for mobile */}
          <div className="flex justify-end lg:hidden mb-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          {MENU_ITEMS.map(({ icon: Icon, label, path }) => (
            <motion.button
              key={path}
              whileHover={{ x: 4 }}
              onClick={() => {
                navigate(path);
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive(path)
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}