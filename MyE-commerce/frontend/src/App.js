import { Badge, CarouselItem, Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import React, { useContext } from 'react';
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store';
function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Logo</Navbar.Brand>
            </Container>
            <Nav className="me-auto">
              <Link className="nav-link" to="/cart">
                Cart
                {cart.carteItem.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.carteItem.length}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
              <Route path="/product/:slug" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>

        <footer className="text-center">ALL RIGHT RESERVED</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
