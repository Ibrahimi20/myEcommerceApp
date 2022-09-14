import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import React, { useContext } from 'react';
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store';
import CartsScreen from './screens/CartsScreen';
import { LinkContainer } from 'react-router-bootstrap';
import SigninScreen from './screens/signinScreen';
function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Logo</Navbar.Brand>
              </LinkContainer>

              <Nav className="me-auto">
                <Link className="nav-link" to="/cart">
                  Cart
                  {cart.carteItem.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.carteItem.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
              <Route path="/cart" element={<CartsScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
            </Routes>
          </Container>
        </main>

        <footer className="text-center">ALL RIGHT RESERVED</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
