import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Search, Settings } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { usePreferences } from '../../hooks/usePreferences';
import { Button } from '../ui/Button';
import { cn } from '../../lib/classNames';

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const preferences = usePreferences();
  const [showSearch, setShowSearch] = useState(false);

  const isSearchPage = location.pathname === '/search';

  return (
    <motion.div
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-40"
    >
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: preferences.accentColor }}
            >
              ▶
            </div>
            <span className="text-lg font-bold hidden sm:inline">PremiumWatch</span>
          </motion.div>
        </div>

        {/* Center - Search */}
        {!showSearch && !isSearchPage && (
          <Button
            variant="secondary"
            size="md"
            className="hidden sm:flex ml-auto mr-auto"
            onClick={() => navigate('/search')}
          >
            <Search className="w-4 h-4" />
            <span className="text-gray-500">Search videos...</span>
          </Button>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/search')}
            className="sm:hidden"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/settings')}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}