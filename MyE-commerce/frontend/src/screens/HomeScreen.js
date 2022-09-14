import React, { useEffect, useReducer, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
//import data from '../data';
import Product from '../component/Product';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../component/MessageBox';
import LoadingBox from '../component/LoadingBox';
import { getError } from '../utils';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function HomeScreen() {
  //const [products, setproducts] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>HomePage</title>
      </Helmet>
      <h1>Featured products</h1>
      <Row>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
