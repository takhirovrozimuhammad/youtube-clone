import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useSearchVideos } from '../hooks/useVideos';
import { SearchBar } from '../components/search/SearchBar';
import { VideoCard } from '../components/video/VideoCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useVideoStore } from '../store/videoStore';
import { Badge } from '../components/ui/Badge';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { data: searchResults = [], isLoading } = useSearchVideos(query, submitted);
  const { recentSearches, addRecentSearch, clearRecentSearches } = useVideoStore();

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      addRecentSearch(searchQuery);
      setSubmitted(true);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8"
    >
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          suggestions={recentSearches}
          showSuggestions={showSuggestions && !submitted}
          onSuggestionClick={handleSuggestionClick}
          className="max-w-2xl mx-auto"
        />
      </div>

      {/* Recent Searches */}
      {!submitted && recentSearches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Searches</h2>
            <button
              onClick={clearRecentSearches}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Clear All
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {recentSearches.map((search) => (
              <Badge
                key={search}
                variant="default"
                className="cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900"
                onClick={() => handleSearch(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Results for "{query}"
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchResults.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No videos found for "{query}"
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}