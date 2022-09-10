import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Logo</Navbar.Brand>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
        </main>

        <footer className="text-center">ALL RIGHT RESERVED</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
