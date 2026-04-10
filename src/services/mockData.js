// Fallback mock data for when API is unavailable
export const MOCK_VIDEOS = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up - Rick Astley',
    description: 'The legendary music video by Rick Astley',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    channelName: 'Rick Astley',
    channelId: 'UCuAXFkgsw1L7xaCfnd5J-xQ',
    viewCount: '1400000000',
    likeCount: '12000000',
    commentCount: '2000000',
    publishedAt: '2009-10-25T00:00:00Z',
    duration: 'PT3M32S',
  },
  {
    id: 'kJQP7kiw9Fk',
    title: 'Luis Fonsi - Despacito',
    description: 'Despacito Official Video',
    thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw9Fk/maxresdefault.jpg',
    channelName: 'Luis Fonsi',
    channelId: 'UCa-vrCl4HGvPf5jFXPf2nVA',
    viewCount: '8300000000',
    likeCount: '50000000',
    commentCount: '5000000',
    publishedAt: '2017-01-12T00:00:00Z',
    duration: 'PT3M47S',
  },
];

export const MOCK_SEARCH_RESULTS = [
  ...MOCK_VIDEOS,
  {
    id: 'jNQXAC9IVRw',
    title: 'Me at the zoo',
    description: 'The first YouTube video ever uploaded',
    thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    channelName: 'jawed',
    channelId: 'UCBR8-60-B8q_2La_hu5QyAQ',
    viewCount: '300000000',
    likeCount: '5000000',
    commentCount: '1000000',
    publishedAt: '2005-04-23T00:00:00Z',
    duration: 'PT0M18S',
  },
];