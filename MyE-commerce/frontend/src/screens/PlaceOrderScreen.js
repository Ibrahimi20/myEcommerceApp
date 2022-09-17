import React, { useContext, useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import CheckOutSteps from '../component/CheckOutSteps';
import { Store } from '../Store';

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    userinfo,
    cart: { paymentMethod, carteItem, shippingAdress },
  } = state;

  const round2 = (num) => {
    return Math.round(num * 100 + Number.EPSILON) / 100;
  };

  state.cart.itemsPrice = round2(
    carteItem.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  state.cart.shippingPrice =
    state.cart.itemsPrice > 100 ? round2(0) : round2(10);

  state.cart.taxPrice = round2(0.15 * state.cart.itemsPrice);

  state.cart.totalPrice =
    state.cart.itemsPrice + state.cart.shippingPrice + state.cart.taxPrice;

  const placeOrderHandler = async () => {};

  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment');
    }
  }, [paymentMethod, navigate]);
  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="mb-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong>
                {shippingAdress.fullname}
                <br />
                <strong>Address:</strong>
                {shippingAdress.adress},{shippingAdress.city},
                {shippingAdress.postalCode},{shippingAdress.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method : </strong>
                {paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {carteItem.map((item) => {
                  return (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            style={{ maxHeight: '60px' }}
                            className="img-fluid rounded img-thumbnail"
                            src={item.image}
                            alt={item.name}
                          ></img>{' '}
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>

                        <Col md={3}>
                          <span>{item.quantity}</span>{' '}
                        </Col>

                        <Col md={3}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${state.cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${state.cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>
                      <strong>${state.cart.taxPrice.toFixed(2)} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Order Total</Col>
                    <Col>
                      <strong>${state.cart.totalPrice.toFixed(2)} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={carteItem.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
