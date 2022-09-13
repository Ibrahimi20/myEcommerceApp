import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MessageBox from '../component/MessageBox';
import { Store } from '../Store';
export default function CartsScreen() {
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    cart: { carteItem },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const res = await axios.get(`/api/products/${item._id}`);
    if (res.data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    ctxdispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxdispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item,
    });
  };
  return (
    <div>
      <Helmet>
        <title>cart</title>
      </Helmet>
      <h1>Cart Shopping</h1>
      <Row>
        <Col md={8}>
          {carteItem.length === 0 ? (
            <MessageBox>
              Cart is empty, <Link to="/"> Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {carteItem.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        style={{ height: '60px' }}
                        src={item.image}
                        alt={item.nema}
                        className="img-fluid rounded "
                      ></img>
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>

                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle" />
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle" />
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({carteItem.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items): $
                    {carteItem.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={carteItem.length === 0}
                    >
                      Proceed to Checkout
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
