import React from 'react';
import './checkout.scss';
import CheckoutHeader from "./CheckoutHeader";
import CheckoutForm from "./CheckoutForm";
import CheckoutOrder from "./CheckoutOrder";

export default function CheckoutBody() {
  return (
    <div className="checkout__body">
      <CheckoutHeader />
      <CheckoutOrder />
      <CheckoutForm />
    </div>
  )
}
