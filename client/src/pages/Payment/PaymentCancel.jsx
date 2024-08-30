import React from 'react';
import { Typography, Box } from '@mui/material';

const PaymentCancel = () => (
  <Box sx={{ textAlign: 'center', mt: 5 }}>
    <Typography variant="h4" color="red">
      Payment Cancelled
    </Typography>
    <Typography variant="body1">
      Your payment was not completed. Please try again.
    </Typography>
  </Box>
);

export default PaymentCancel;
