import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../component/CheckOutSteps';
import { Store } from '../Store';

export default function ShippingAdressScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxdispatch } = useContext(Store);

  const [fullname, setFullName] = useState(
    state.cart.shippingAdress.fullname || ''
  );
  const [adress, setadress] = useState(state.cart.shippingAdress.adress || '');
  const [postalCode, setpostalCode] = useState(
    state.cart.shippingAdress.postalCode || ''
  );
  const [city, setcity] = useState(state.cart.shippingAdress.city | '');
  const [country, setcountry] = useState(
    state.cart.shippingAdress.country || ''
  );

  const adressSubmitHandler = (e) => {
    e.preventDefault();
    ctxdispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullname,
        adress,
        postalCode,
        city,
        country,
      },
    });
    localStorage.setItem(
      'shippingAdress',
      JSON.stringify({
        fullname,
        adress,
        postalCode,
        city,
        country,
      })
    );

    navigate('/payment');
  };

  useEffect(() => {
    if (!state.userinfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [navigate, state.userinfo]);

  return (
    <div>
      <Helmet>
        <title>Shipping Adress</title>
      </Helmet>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <div style={{ maxWidth: '600px' }} className="container small-container">
        <h1 className="my-3">SHipping Adress</h1>
        <Form onSubmit={adressSubmitHandler}>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={(e) => setFullName(e.target.value)}
              required
              value={fullname}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="adress">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              onChange={(e) => setadress(e.target.value)}
              required
              value={adress}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={(e) => setcity(e.target.value)}
              required
              value={city}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              onChange={(e) => setpostalCode(e.target.value)}
              required
              value={postalCode}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              onChange={(e) => setcountry(e.target.value)}
              required
              value={country}
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
