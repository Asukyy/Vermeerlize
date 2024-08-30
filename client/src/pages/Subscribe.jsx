import React from 'react';
import { Grid, Box, Typography, Button, Card, CardContent, CardActions, styled } from '@mui/material';
import { motion } from 'framer-motion';

// Plan details
const plans = [
  {
    name: "Starter",
    price: "10€/month",
    annualPrice: "100€/year (2 months free)",
    features: [
      "10 AI-generated images/month",
      "Basic image resolution",
      "Access to community gallery",
    ],
    color: "#f44336", // Red
  },
  {
    name: "Pro",
    price: "25€/month",
    annualPrice: "250€/year (2 months free)",
    features: [
      "50 AI-generated images/month",
      "High image resolution",
      "Advanced customization options",
      "Priority support",
    ],
    color: "#2196f3", // Blue
  },
  {
    name: "Elite",
    price: "50€/month",
    annualPrice: "500€/year (2 months free)",
    features: [
      "Unlimited AI-generated images",
      "Ultra high image resolution",
      "Exclusive AI models",
      "Custom API access",
      "VIP support",
    ],
    color: "#4caf50", // Green
  },
];

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: theme.spacing(1, 4),
  fontSize: '16px',
  fontWeight: 'bold',
  color: theme.palette.common.white,
  backgroundColor: '#007bff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}));

const Subscribe = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Choose Your Plan
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph align="center">
        Select the plan that best suits your needs and start creating stunning images today!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <StyledCard sx={{ backgroundColor: plan.color }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom align="center">
                    {plan.name}
                  </Typography>
                  <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" color="inherit" align="center" sx={{ mb: 2 }}>
                    {plan.annualPrice}
                  </Typography>
                  <Box>
                    {plan.features.map((feature, idx) => (
                      <Typography key={idx} variant="body2" color="inherit" paragraph>
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <StyledButton variant="contained">Choose Plan</StyledButton>
                </CardActions>
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Subscribe;
