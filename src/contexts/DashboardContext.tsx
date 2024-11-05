import * as React from 'react';

export type DashboardView = 'home' | 'interviews' | 'insights' | 'questions' | 'notes';

interface DashboardContextType {
  currentView: DashboardView;
  setCurrentView: (view: DashboardView) => void;
}

export const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = React.useState<DashboardView>('home');

  return (
    <DashboardContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = React.useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
} 