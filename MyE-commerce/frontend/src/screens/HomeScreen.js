import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
//import data from '../data';
import Product from '../component/Product';
import axios from 'axios';
export default function HomeScreen() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setproducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <Container>
      <h1>Featured products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
