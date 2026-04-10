import React from 'react';
import { motion } from 'framer-motion';
import { Heart, BookmarkPlus, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useVideoStore } from '../../store/videoStore';
import { usePreferences } from '../../hooks/usePreferences';
import { cn } from '../../lib/classNames';

export function VideoCard({ video, onLikeChange, onSaveChange }) {
  const navigate = useNavigate();
  const { addLikedVideo, removeLikedVideo, addSavedVideo, removeSavedVideo } = useVideoStore();
  const preferences = usePreferences();
  const { likedVideos, savedVideos } = useVideoStore();

  const isLiked = likedVideos.some(v => v.id === video.id);
  const isSaved = savedVideos.some(v => v.id === video.id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      removeLikedVideo(video.id);
    } else {
      addLikedVideo(video);
    }
    onLikeChange?.();
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (isSaved) {
      removeSavedVideo(video.id);
    } else {
      addSavedVideo(video);
    }
    onSaveChange?.();
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/watch/${video.id}`)}
      className="cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-200 dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-shadow">
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white rounded-full p-3"
            style={{ backgroundColor: preferences.accentColor }}
          >
            <Play className="w-6 h-6 text-white fill-white" />
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={cn(
              'p-2 rounded-full backdrop-blur-md transition-colors',
              isLiked
                ? 'bg-red-500/80 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            )}
          >
            <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={cn(
              'p-2 rounded-full backdrop-blur-md transition-colors',
              isSaved
                ? 'bg-blue-500/80 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            )}
          >
            <BookmarkPlus className={cn('w-4 h-4', isSaved && 'fill-current')} />
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-gray-100">
          {video.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
          {video.channelName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {video.viewCount ? `${parseInt(video.viewCount).toLocaleString()} views` : 'Recently watched'}
        </p>
      </div>
    </motion.div>
  );
}