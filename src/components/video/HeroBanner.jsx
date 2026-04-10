import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookmarkPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { usePreferences } from '../../hooks/usePreferences';

export function HeroBanner({ video }) {
  const navigate = useNavigate();
  const preferences = usePreferences();

  if (!video) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-premium-lg group mb-8"
    >
      {/* Background Image */}
      <motion.img
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        src={video.thumbnail}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/30 to-black/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12 text-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl space-y-4"
        >
          <h1 className="text-3xl lg:text-5xl font-bold line-clamp-2">
            {video.title}
          </h1>
          <p className="text-gray-200 line-clamp-2 text-sm lg:text-base">
            {video.description}
          </p>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => navigate(`/watch/${video.id}`)}
              className="bg-white text-gray-900 hover:bg-gray-200"
            >
              <Play className="w-5 h-5" />
              Watch Now
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
              <BookmarkPlus className="w-5 h-5" />
              Save
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}