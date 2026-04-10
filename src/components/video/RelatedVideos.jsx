import React from 'react';
import { motion } from 'framer-motion';
import { VideoCard } from './VideoCard';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function RelatedVideos({ videos = [], isLoading = false, title = 'Related Videos' }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-gray-100">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {video.channelName}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {video.viewCount ? `${parseInt(video.viewCount).toLocaleString()} views` : ''}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No related videos found
        </div>
      )}
    </motion.div>
  );
}