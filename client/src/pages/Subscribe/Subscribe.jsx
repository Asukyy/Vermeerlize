import React, { useState } from 'react';
import '../../styles/SubscriptionPlans.css';
import plans from './subscribeplans';


const Subscribe = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  return (
    <div className="subscription-plans-container">
      <div className="header-bar">
        <h2 className="titre-header-spe">Choose Your Subscription Plan</h2>
        <div className="billing-toggle">
          <span className={billingCycle === 'monthly' ? 'active' : ''} onClick={toggleBillingCycle}>
            Monthly
          </span>
          <span className="toggle-divider">|</span>
          <span className={billingCycle === 'yearly' ? 'active' : ''} onClick={toggleBillingCycle}>
            Yearly
          </span>
        </div>
      </div>

      <div className="subscription-plans">
        {plans.map((plan, index) => (
          <div key={index} className={`plan-card ${plan.isHighlighted ? 'highlighted' : ''}`}>
            <div className="plan-header">
              {billingCycle === 'monthly' && plan.oldMonthlyPrice && (
                <span className="old-price">{plan.oldMonthlyPrice}</span>
              )}
              <h3>{plan.name}</h3>
              <p className="price">{billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}</p>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="subscribe-button">Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
