import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from '../Store';
import Rating from './Rating';

export default function Product(props) {
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    cart: { carteItem },
  } = state;
  const updateCartHandler = async (item) => {
    const existitem = carteItem.find((x) => x._id === item._id);
    const quantity = existitem ? existitem.quantity + 1 : 1;
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

  return (
    <Card className="product">
      <LinkContainer to={`/product/${props.product.slug}`}>
        <img
          className="card-img-top"
          src={props.product.image}
          alt={props.product.name}
        />
      </LinkContainer>
      <Card.Body>
        <LinkContainer to={`/product/${props.product.slug}`}>
          <Card.Title>{props.product.name}</Card.Title>
        </LinkContainer>

        <Rating
          rating={props.product.rating}
          numReviews={props.product.numReviews}
        ></Rating>
        <Card.Text>${props.product.price}</Card.Text>
        {props.product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out Of Stock
          </Button>
        ) : (
          <button onClick={() => updateCartHandler(props.product)}>
            Add to Cart
          </button>
        )}
      </Card.Body>
    </Card>
  );
}
