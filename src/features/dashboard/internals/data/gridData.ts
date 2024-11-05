import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'candidate', headerName: 'Candidate', width: 130 },
  { field: 'score', headerName: 'Score', width: 90 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
];

export const rows = [
  { id: 1, candidate: 'John Doe', score: 85, date: '2024-03-20', status: 'Completed' },
  { id: 2, candidate: 'Jane Smith', score: 92, date: '2024-03-19', status: 'Completed' },
  { id: 3, candidate: 'Bob Wilson', score: 78, date: '2024-03-18', status: 'In Progress' },
]; 