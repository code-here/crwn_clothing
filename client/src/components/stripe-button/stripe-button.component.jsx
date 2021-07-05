import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IzJMGSJkZwrQ4JoryCnlOQhUrwOZMPIY52csZWvpYjh8TU015QMgGkJPqbYrsWVpEru1KmZIsZ9VqMU1NriBBBn00Vo5gWImr";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "POST",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(() => alert("payment successful"))
      .catch((err) => {
        console.log(`you gota debug your code buddy here's an hint: ${err}`);
        alert("there was an problem with your payment");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN clothing ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
