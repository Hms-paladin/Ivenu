import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import PaymentRequestForm from './CheckoutForm';

class StripeComponent extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
     
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <PaymentRequestForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default StripeComponent;