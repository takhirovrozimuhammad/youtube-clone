import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  searchFocused: false,
  playerFullscreen: false,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSearchFocused: (focused) => set({ searchFocused: focused }),
  setPlayerFullscreen: (fullscreen) => set({ playerFullscreen: fullscreen }),
}));