import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import { Input } from '../ui/Input';
import { cn } from '../../lib/classNames';

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  suggestions = [],
  onSuggestionClick,
  showSuggestions = false,
  className,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onBlur?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(value); }}>
        <div className="relative">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={() => { }}
            placeholder="Search videos..."
            icon={Search}
            className="text-lg py-3"
          />
          {value && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => onChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {suggestions.map((suggestion, idx) => (
              <motion.button
                key={idx}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="w-full px-4 py-3 text-left flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span>{suggestion}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

