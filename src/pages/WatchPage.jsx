import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useVideoDetails, useRelatedVideos } from '../hooks/useVideos';
import { PlayerSection } from '../components/video/PlayerSection';
import { RelatedVideos } from '../components/video/RelatedVideos';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useState } from 'react';

export default function WatchPage() {
  const { videoId } = useParams();
  const { data: video, isLoading: videoLoading } = useVideoDetails(videoId);
  const { data: relatedVideos = [], isLoading: relatedLoading } = useRelatedVideos(videoId);
  const [likeCount, setLikeCount] = useState(0);

  if (videoLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 dark:text-gray-400">Video not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Player - Full width on mobile */}
        <div className="lg:col-span-2">
          <PlayerSection video={video} onLikeChange={() => setLikeCount(c => c + 1)} />
        </div>

        {/* Related Videos - Below player on mobile, right sidebar on desktop */}
        <div className="lg:col-span-1">
          <RelatedVideos videos={relatedVideos} isLoading={relatedLoading} />
        </div>
      </div>
    </motion.div>
  );
}