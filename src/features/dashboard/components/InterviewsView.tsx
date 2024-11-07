import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StartInterviewModal, { InterviewFormData } from './StartInterviewModal';
import { api } from '@/services/api';

export default function InterviewsView() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleStartInterview = () => {
    console.log('Start interview clicked');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitInterview = async (formData: InterviewFormData) => {
    try {
      console.log('Sending interview creation request with:', formData);
      const { data } = await api.post('/interviews', formData);
      console.log('Interview created:', data);
      setIsModalOpen(false);
      return { id: data.id };
    } catch (error) {
      console.error('Failed to create interview:', error);
      return undefined;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography component="h2" variant="h6">
          Mock Interviews
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrowIcon />}
          onClick={handleStartInterview}
        >
          Start Interview
        </Button>
      </Stack>
      
      <Typography color="text.secondary">
        No interviews completed yet. Click "Start Interview" to begin your first mock interview.
      </Typography>

      <StartInterviewModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitInterview}
      />
    </Box>
  );
} 