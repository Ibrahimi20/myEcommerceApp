import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxdispatch } = useContext(Store);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === confirmpassword) {
      console.log('inside If statement');
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name: name,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
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
        <title>Sing Up</title>
      </Helmet>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setname(e.target.value)} required />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setconfirmpassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sing Up</Button>
        </div>
      </Form>
      <div className="mb-3">
        Already have an account?{' '}
        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
      </div>
    </Container>
  );
}
