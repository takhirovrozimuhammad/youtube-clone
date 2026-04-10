import React from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { useUIStore } from '../../store/uiStore';

export function AppShell({ children }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen bg-white dark:bg-black">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto mt-16 mb-16 lg:mb-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Bottom Nav */}
        <BottomNav />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar />
      </div>
    </div>
  );
}