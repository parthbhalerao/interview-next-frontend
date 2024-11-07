import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/navigation';

// Sample companies - you can replace this with your actual company data
const companies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Apple',
  'Meta',
  'Netflix',
  'Tesla',
  'Other'
];

export interface InterviewFormData {
  position: string;
  company: string;
  experience: string;
  notes: string;
}

interface StartInterviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: InterviewFormData) => Promise<{ id: number } | undefined>;
}

export default function StartInterviewModal({ open, onClose, onSubmit }: StartInterviewModalProps) {
  const [formData, setFormData] = React.useState<InterviewFormData>({
    position: '',
    company: '',
    experience: '',
    notes: '',
  });

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted with data:', formData);
    const result = await onSubmit(formData);
    console.log('Submit result:', result);
    if (result?.id) {
      console.log('Navigating to room:', `/interviews/${result.id}/room`);
      router.push(`/interviews/${result.id}/room`);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle>Start New Interview</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Stack spacing={3}>
          <TextField
            label="Position"
            fullWidth
            required
            placeholder="Position"
            size="medium"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          />
          <Autocomplete
            freeSolo
            options={companies}
            value={formData.company}
            onChange={(_, newValue) => {
              setFormData({ ...formData, company: newValue || '' });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Company"
                required
                placeholder="Company"
                size="medium"
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            )}
          />
          <FormControl fullWidth required>
            <InputLabel id="experience-level-label">Experience Level</InputLabel>
            <Select
              labelId="experience-level-label"
              value={formData.experience}
              label="Experience Level"
              size="medium"
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            >
              <MenuItem value="entry">Entry Level</MenuItem>
              <MenuItem value="mid">Mid Level</MenuItem>
              <MenuItem value="senior">Senior Level</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Additional Notes"
            multiline
            rows={4}
            placeholder="Add any additional notes or context"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={onClose} variant="text">Cancel</Button>
        <Button type="submit" variant="contained">Start Interview</Button>
      </DialogActions>
    </Dialog>
  );
} 