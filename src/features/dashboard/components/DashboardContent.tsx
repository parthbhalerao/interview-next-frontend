import * as React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import MainGrid from '@/features/dashboard/components/MainGrid';
import InterviewsView from '@/features/dashboard/components/InterviewsView';

const InsightsView = () => <div>Insights View</div>; // Replace with actual component
const QuestionsView = () => <div>Questions View</div>; // Replace with actual component
const NotesView = () => <div>Notes View</div>; // Replace with actual component

export default function DashboardContent() {
  const { currentView } = useDashboard();

  switch (currentView) {
    case 'home':
      return <MainGrid />;
    case 'interviews':
      return <InterviewsView />;
    case 'insights':
      return <InsightsView />;
    case 'questions':
      return <QuestionsView />;
    case 'notes':
      return <NotesView />;
    default:
      return <MainGrid />;
  }
} 