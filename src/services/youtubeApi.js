import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const youtubeApi = {
  // Search videos
  searchVideos: async (query, pageToken = '', maxResults = 20) => {
    try {
      const response = await client.get('/search', {
        params: {
          q: query,
          part: 'snippet',
          type: 'video',
          maxResults,
          pageToken,
          relevanceLanguage: 'en',
          order: 'relevance',
        },
      });
      return response.data;
    } catch (error) {
      console.error('YouTube API search error:', error);
      throw error;
    }
  },

  // Get video details
  getVideoDetails: async (videoIds) => {
    try {
      const response = await client.get('/videos', {
        params: {
          part: 'snippet,statistics,contentDetails',
          id: Array.isArray(videoIds) ? videoIds.join(',') : videoIds,
        },
      });
      return response.data;
    } catch (error) {
      console.error('YouTube API video details error:', error);
      throw error;
    }
  },

  // Get trending videos
  getTrendingVideos: async (maxResults = 20) => {
    try {
      const response = await client.get('/videos', {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          regionCode: 'US',
          maxResults,
          videoCategoryId: '0',
        },
      });
      return response.data;
    } catch (error) {
      console.error('YouTube API trending error:', error);
      throw error;
    }
  },

  // Get channel details
  getChannelDetails: async (channelIds) => {
    try {
      const response = await client.get('/channels', {
        params: {
          part: 'snippet,statistics',
          id: Array.isArray(channelIds) ? channelIds.join(',') : channelIds,
        },
      });
      return response.data;
    } catch (error) {
      console.error('YouTube API channel details error:', error);
      throw error;
    }
  },

  // Get related videos
  getRelatedVideos: async (videoId, maxResults = 12) => {
    try {
      const response = await client.get('/search', {
        params: {
          relatedToVideoId: videoId,
          part: 'snippet',
          type: 'video',
          maxResults,
        },
      });
      return response.data;
    } catch (error) {
      console.error('YouTube API related videos error:', error);
      throw error;
    }
  },
};

// Helper to format video data
export function formatVideoData(item) {
  if (item.kind === 'youtube#searchResult') {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      channelId: item.snippet.channelId,
      channelName: item.snippet.channelName,
      publishedAt: item.snippet.publishedAt,
    };
  }

  if (item.kind === 'youtube#video') {
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url,
      channelId: item.snippet.channelId,
      channelName: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      viewCount: item.statistics?.viewCount || 0,
      likeCount: item.statistics?.likeCount || 0,
      commentCount: item.statistics?.commentCount || 0,
      duration: item.contentDetails?.duration || 'PT0S',
    };
  }

  return item;
}