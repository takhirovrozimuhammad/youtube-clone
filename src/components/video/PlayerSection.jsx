import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookmarkPlus, Share2, MoreVertical } from 'lucide-react';
import { useVideoStore } from '../../store/videoStore';
import { Button } from '../ui/Button';
import { usePreferences } from '../../hooks/usePreferences';
import { cn } from '../../lib/classNames';

export function PlayerSection({ video, onLikeChange }) {
  const { addLikedVideo, removeLikedVideo, addSavedVideo, removeSavedVideo, addToHistory } = useVideoStore();
  const { likedVideos, savedVideos } = useVideoStore();
  const preferences = usePreferences();
  const playerRef = useRef(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const isLiked = likedVideos.some(v => v.id === video.id);
  const isSaved = savedVideos.some(v => v.id === video.id);

  useEffect(() => {
    if (video) {
      addToHistory(video);
    }
  }, [video, addToHistory]);

  const handleLike = () => {
    if (isLiked) {
      removeLikedVideo(video.id);
    } else {
      addLikedVideo(video);
    }
    onLikeChange?.();
  };

  const handleSave = () => {
    if (isSaved) {
      removeSavedVideo(video.id);
    } else {
      addSavedVideo(video);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/watch/${video.id}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* YouTube Player */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-premium">
        <iframe
          ref={playerRef}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Video Info */}
      <div className="space-y-4">
        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          {video.title}
        </h1>

        {/* Channel and Stats */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {video.channelName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {video.viewCount ? `${parseInt(video.viewCount).toLocaleString()} views` : 'Recently watched'} •{' '}
              {new Date(video.publishedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={cn(
                'px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors',
                isLiked
                  ? 'bg-red-500/20 text-red-600 dark:text-red-400'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              )}
            >
              <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
              Like
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={cn(
                'px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors',
                isSaved
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              )}
            >
              <BookmarkPlus className={cn('w-5 h-5', isSaved && 'fill-current')} />
              Save
            </motion.button>
            <Button variant="secondary" size="md" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
              Share
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <p
            className={cn(
              'text-sm text-gray-700 dark:text-gray-300 leading-relaxed',
              !showFullDescription && 'line-clamp-3'
            )}
          >
            {video.description}
          </p>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}