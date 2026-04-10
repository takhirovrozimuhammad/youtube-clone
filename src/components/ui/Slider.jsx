import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/classNames';

export function Slider({
  min = 0,
  max = 100,
  value,
  onChange,
  step = 1,
  className,
  label,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute w-full h-2 appearance-none bg-transparent rounded-full cursor-pointer pointer-events-none accent-blue-500"
          style={{
            WebkitAppearance: 'none',
            outline: 'none',
          }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-blue-500 pointer-events-none"
          style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
          animate={isDragging ? { scale: 1.2 } : { scale: 1 }}
        />
      </div>
    </div>
  );
}