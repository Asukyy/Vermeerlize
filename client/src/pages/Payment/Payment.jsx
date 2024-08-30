import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@mui/material';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const handleCheckout = async () => {
        const response = await fetch('http://localhost:8080/api/v1/payment/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 1000, // Montant en centimes (10.00 EUR)
                currency: 'eur',
            }),
        });

        const { id } = await response.json();
        const stripe = await stripePromise;

        await stripe.redirectToCheckout({ sessionId: id });
    };

    return (
        <Button variant="contained" color="primary" onClick={handleCheckout}>
            Pay Now
        </Button>
    );
};

export default Payment;
