import React from 'react';
import { Typography, Box } from '@mui/material';

const PaymentSuccess = () => (
  <Box sx={{ textAlign: 'center', mt: 5 }}>
    <Typography variant="h4" color="green">
      Payment Successful!
    </Typography>
    <Typography variant="body1">
      Thank you for your purchase. Your transaction has been completed.
    </Typography>
  </Box>
);

export default PaymentSuccess;
