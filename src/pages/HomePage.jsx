import React from 'react';
import { motion } from 'framer-motion';
import { useTrendingVideos, useSearchVideos } from '../hooks/useVideos';
import { HeroBanner } from '../components/video/HeroBanner';
import { VideoShelf } from '../components/video/VideoShelf';
import { Chip } from '../components/ui/Chip';
import { useVideoStore } from '../store/videoStore';
import { VIDEO_CATEGORIES } from '../lib/constants';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { data: trendingVideos = [], isLoading: trendingLoading } = useTrendingVideos();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { watchHistory } = useVideoStore();

  const heroVideo = trendingVideos[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 p-4 lg:p-8"
    >
      {/* Hero Banner */}
      {heroVideo && <HeroBanner video={heroVideo} />}

      {/* Category Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {VIDEO_CATEGORIES.map((category) => (
          <Chip
            key={category}
            isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            className="flex-shrink-0"
          >
            {category}
          </Chip>
        ))}
      </div>

      {/* Continue Watching */}
      {watchHistory.length > 0 && (
        <VideoShelf
          title="Continue Watching"
          videos={watchHistory.slice(0, 10)}
        />
      )}

      {/* Trending Videos */}
      <VideoShelf
        title="Trending Now"
        videos={trendingVideos}
        isLoading={trendingLoading}
      />

      {/* For You Section */}
      <VideoShelf
        title="For You"
        videos={trendingVideos.slice(5, 15)}
        isLoading={trendingLoading}
      />
    </motion.div>
  );
}