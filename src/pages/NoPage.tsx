import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const NoPage = (): ReactNode => {
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <>
      <Alert severity='error'>This page not exist</Alert>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 2,
        }}
      >
        <Button
          variant='contained'
          onClick={handleBackToList}
          sx={{
            px: 4,
            py: 1,
          }}
        >
          Back to List
        </Button>
      </Box>
    </>
  );
};

export default NoPage;
