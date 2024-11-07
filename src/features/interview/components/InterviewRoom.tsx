import * as React from 'react';
import { LiveKitRoom, VideoConference, ControlBar, RoomAudioRenderer } from '@livekit/components-react';
import { Room, RoomEvent } from 'livekit-client';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { interviewService } from '@/services/interviewService';
import '@livekit/components-styles';

interface InterviewRoomProps {
  interviewId: number;
}

export default function InterviewRoom({ interviewId }: InterviewRoomProps) {
  const [token, setToken] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [room, setRoom] = React.useState<Room | null>(null);

  React.useEffect(() => {
    const initializeRoom = async () => {
      try {
        setLoading(true);
        // Create or get room
        const roomData = await interviewService.createRoom(interviewId);
        
        // Get token
        const tokenData = await interviewService.getToken(interviewId);
        setToken(tokenData.token);

        // Initialize LiveKit room
        const newRoom = new Room();
        newRoom.on(RoomEvent.Disconnected, () => {
          console.log('Disconnected from room');
          setError('Disconnected from interview room');
        });

        setRoom(newRoom);
      } catch (err) {
        console.error('Failed to initialize room:', err);
        setError('Failed to connect to interview room');
      } finally {
        setLoading(false);
      }
    };

    initializeRoom();

    return () => {
      // Cleanup
      if (room) {
        room.disconnect();
      }
    };
  }, [interviewId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh' }}>
      {token && (
        <LiveKitRoom
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          connect={true}
          video={true}
          audio={true}
          data-lk-theme="default"
        >
          <VideoConference />
          <RoomAudioRenderer />
          <ControlBar />
        </LiveKitRoom>
      )}
    </Box>
  );
} 