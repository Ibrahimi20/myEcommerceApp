import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const { state, dispatch: ctxdispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email: email,
        password: password,
      });
      console.log(data);
      ctxdispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
      console.log(data);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (state.userinfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, state.userinfo]);
  return (
    <Container style={{ maxWidth: '600px' }}>
      <Helmet>
        <title>Sing In</title>
      </Helmet>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setemail(e.target.value)}
            type="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sing In</Button>
        </div>
      </Form>
      <div className="mb-3">
        New customer?{' '}
        <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
      </div>
    </Container>
  );
}
