import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import data from '../data';
import Product from '../component/Product';

export default function HomeScreen() {
  return (
    <Container>
      <h1>Featured products</h1>
      <Row>
        {data.products.map((product) => (
          <Col sm={6} md={4} lg={3} className="mb-3">
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
