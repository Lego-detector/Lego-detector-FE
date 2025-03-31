'use client';

import { Alert, Snackbar } from '@mui/material';

interface AlertCardProps {
  open: boolean;
  handleClose?: () => void;
  message: string | null;
  severity?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

export default function AlertCard({
  open,
  message,
  handleClose,
  severity = 'info',
  duration = 5000,
}: AlertCardProps) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
