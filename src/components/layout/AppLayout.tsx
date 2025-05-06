
import React from 'react';
import AppHeader from './AppHeader';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  hideHeader?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children,
  hideNav = false,
  hideHeader = false
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {!hideHeader && <AppHeader />}
      
      <main className="flex-1 container mx-auto px-4 pb-16">
        {children}
      </main>
      
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
