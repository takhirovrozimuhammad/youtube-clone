import React from 'react';
import { cn } from '../../lib/classNames';

const variants = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
  secondary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100',
  outline: 'border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200',
};

export function Badge({ className, variant = 'default', onClick, children, ...props }) {
  const Comp = onClick ? 'button' : 'span';
  return (
    <Comp
      className={cn('inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors', variants[variant] || variants.default, onClick && 'cursor-pointer', className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Comp>
  );
}
