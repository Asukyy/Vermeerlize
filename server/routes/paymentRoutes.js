import express from 'express';
import stripe from '../stripe.js';

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    console.error("Amount or currency is missing");
    return res.status(400).json({ error: "Amount or currency is missing" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Subscription Payment',
            },
            unit_amount: amount * 100, // Convertit les euros en centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    console.log("Session created:", session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
