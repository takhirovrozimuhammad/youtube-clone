import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useVideoStore = create(
  persist(
    (set) => ({
      likedVideos: [],
      savedVideos: [],
      watchHistory: [],
      recentSearches: [],

      // Liked videos
      addLikedVideo: (video) => set((state) => ({
        likedVideos: state.likedVideos.some(v => v.id === video.id)
          ? state.likedVideos
          : [...state.likedVideos, video]
      })),
      removeLikedVideo: (videoId) => set((state) => ({
        likedVideos: state.likedVideos.filter(v => v.id !== videoId)
      })),
      isVideoLiked: (videoId) => {
        const state = useVideoStore.getState();
        return state.likedVideos.some(v => v.id === videoId);
      },

      // Saved videos
      addSavedVideo: (video) => set((state) => ({
        savedVideos: state.savedVideos.some(v => v.id === video.id)
          ? state.savedVideos
          : [...state.savedVideos, video]
      })),
      removeSavedVideo: (videoId) => set((state) => ({
        savedVideos: state.savedVideos.filter(v => v.id !== videoId)
      })),
      isVideoSaved: (videoId) => {
        const state = useVideoStore.getState();
        return state.savedVideos.some(v => v.id === videoId);
      },

      // Watch history
      addToHistory: (video) => set((state) => {
        const filtered = state.watchHistory.filter(v => v.id !== video.id);
        return {
          watchHistory: [{ ...video, watchedAt: new Date().toISOString() }, ...filtered].slice(0, 100)
        };
      }),
      clearHistory: () => set({ watchHistory: [] }),

      // Recent searches
      addRecentSearch: (query) => set((state) => {
        const filtered = state.recentSearches.filter(q => q !== query);
        return {
          recentSearches: [query, ...filtered].slice(0, 10)
        };
      }),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'premium-watch-videos',
      version: 1,
    }
  )
);