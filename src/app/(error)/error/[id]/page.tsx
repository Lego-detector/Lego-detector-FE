'use client';

import { useParams } from 'next/navigation';
import { Typography, Box, Container } from '@mui/material';

const errors: Record<string, string> = {
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '426': 'Upgrade Required',
  '429': 'Too Many Requests',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
};

export default function CustomError() {
  const _id = useParams<{ id: string }>().id;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: '#f7f7f7',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Error {_id}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          {errors[_id] || 'Unknown Error'}
        </Typography>
      </Box>
    </Container>
  );
}
