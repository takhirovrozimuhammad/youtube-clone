import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/classNames';

export function Input({
  icon: Icon,
  error,
  className,
  ...props
}) {
  return (
    <div className="relative">
      <motion.input
        whileFocus={{ scale: 1.01 }}
        className={cn(
          'w-full px-4 py-2.5 pl-10 rounded-lg',
          'bg-gray-100 dark:bg-gray-800',
          'border border-gray-300 dark:border-gray-700',
          'text-gray-900 dark:text-gray-100',
          'placeholder-gray-500 dark:placeholder-gray-400',
          'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
          error && 'border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}