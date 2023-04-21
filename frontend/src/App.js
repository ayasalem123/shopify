import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Homepage from './pages/home';
import Productscreen from './pages/productscreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import CartScreen from './pages/CartScreen';
function App() {
  const {cart} = useSelector((state) => state)
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Shop</Navbar.Brand>
              </LinkContainer>
              
              <Nav className="me-auto">
                <Link to="/cart" className='nav-link'>
                  Cart
                  {
                    cart.number>0 && <Badge pill bg="danger">
                      {cart.number}
                    </Badge>
                  }
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
        <Container className='mt-3 '>
          <Routes>
            
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:slug" element={<Productscreen />} />
            <Route path="/cart" element={<CartScreen/>} />
          </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">all rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
