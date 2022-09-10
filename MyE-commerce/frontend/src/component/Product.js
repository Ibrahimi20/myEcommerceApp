import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

export default function Product(props) {
  return (
    <Card className="product">
      <a href={`/product/${props.product.slug}`}>
        <img
          className="card-img-top"
          src={props.product.image}
          alt={props.product.name}
        />
      </a>
      <Card.Body>
        <a href={`/product/${props.product.slug}`}>
          <Card.Title>{props.product.name}</Card.Title>
        </a>

        <Rating
          rating={props.product.rating}
          numReviews={props.product.numReviews}
        ></Rating>
        <Card.Text>${props.product.price}</Card.Text>
        <button>Add to Cart</button>
      </Card.Body>
    </Card>
  );
}
