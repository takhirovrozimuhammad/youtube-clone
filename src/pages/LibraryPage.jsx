import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Heart, BookmarkPlus, Clock } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';
import { VideoCard } from '../components/video/VideoCard';
import { Chip } from '../components/ui/Chip';
import { Button } from '../components/ui/Button';

export default function LibraryPage() {
  const { likedVideos, savedVideos, watchHistory } = useVideoStore();
  const [activeTab, setActiveTab] = useState('liked');

  const tabs = [
    { id: 'liked', label: 'Liked Videos', icon: Heart, videos: likedVideos },
    { id: 'saved', label: 'Saved Videos', icon: BookmarkPlus, videos: savedVideos },
    { id: 'history', label: 'Watch History', icon: Clock, videos: watchHistory },
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);
  const currentVideos = activeTabData?.videos || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 space-y-8"
    >
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Chip
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-shrink-0"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Chip>
          );
        })}
      </div>

      {/* Videos Grid */}
      <AnimatePresence mode="wait">
        {currentVideos.length > 0 ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {currentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="text-gray-500 dark:text-gray-400 space-y-2">
              <p className="text-lg font-medium">No videos yet</p>
              <p className="text-sm">
                {activeTab === 'liked'
                  ? 'Like videos to see them here'
                  : activeTab === 'saved'
                  ? 'Save videos for later'
                  : 'Your watch history will appear here'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}