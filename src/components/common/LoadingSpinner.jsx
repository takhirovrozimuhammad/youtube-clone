import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/classNames';

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function LoadingSpinner({ size = 'md', className }) {
  return <Loader2 className={cn('animate-spin text-gray-500 dark:text-gray-300', sizes[size] || sizes.md, className)} />;
}
