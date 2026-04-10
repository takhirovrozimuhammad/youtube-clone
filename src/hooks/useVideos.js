import { useQuery } from '@tanstack/react-query';
import { youtubeApi, formatVideoData } from '../services/youtubeApi';
import { MOCK_VIDEOS } from '../services/mockData';

export function useSearchVideos(query, enabled = true) {
  return useQuery({
    queryKey: ['videos', 'search', query],
    queryFn: async () => {
      try {
        const data = await youtubeApi.searchVideos(query, '', 20);
        return data.items?.map((item) => formatVideoData(item)) || [];
      } catch (error) {
        console.warn('Using mock data due to API error:', error);
        return MOCK_VIDEOS.filter((v) =>
          v.title.toLowerCase().includes(query.toLowerCase())
        );
      }
    },
    enabled: enabled && !!query,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTrendingVideos() {
  return useQuery({
    queryKey: ['videos', 'trending'],
    queryFn: async () => {
      try {
        const data = await youtubeApi.getTrendingVideos(20);
        return data.items?.map((item) => formatVideoData(item)) || [];
      } catch (error) {
        console.warn('Using mock data due to API error:', error);
        return MOCK_VIDEOS;
      }
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useVideoDetails(videoId, enabled = true) {
  return useQuery({
    queryKey: ['videos', 'details', videoId],
    queryFn: async () => {
      try {
        const data = await youtubeApi.getVideoDetails(videoId);
        const video = data.items?.[0];
        return video ? formatVideoData(video) : null;
      } catch (error) {
        console.warn('Failed to fetch video details:', error);
        return null;
      }
    },
    enabled: enabled && !!videoId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRelatedVideos(videoId, enabled = true) {
  return useQuery({
    queryKey: ['videos', 'related', videoId],
    queryFn: async () => {
      try {
        const data = await youtubeApi.getRelatedVideos(videoId, 12);
        return data.items?.map((item) => formatVideoData(item)) || [];
      } catch (error) {
        console.warn('Failed to fetch related videos:', error);
        return [];
      }
    },
    enabled: enabled && !!videoId,
    staleTime: 1000 * 60 * 10,
  });
}