import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/classNames';
import { X } from 'lucide-react';

export function Chip({
  children,
  onRemove,
  isActive = false,
  onClick,
  className,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full font-medium text-sm transition-all',
        'bg-gray-200 text-gray-900 hover:bg-gray-300',
        'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        isActive && 'bg-blue-500 text-white dark:bg-blue-600',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {children}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.button>
  );
}