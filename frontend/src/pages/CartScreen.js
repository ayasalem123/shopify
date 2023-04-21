import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import MessageBox from '../components/messageBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from 'react-helmet-async';
import { Link ,useNavigate} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { increment, decrement, remove } from '../redux/cartReducer';
function CartScreen() {
  const navigate=useNavigate();
  const { cart } = useSelector((state) => state);
  const reduxDispatch = useDispatch();
  return (
    <div>
      <Helmet>
        <title>shopping cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      {cart?.elements.length <= 0 ? (
        <MessageBox message="empty"></MessageBox>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              {cart.elements?.map((el) => {
                console.log(el);
                return (
                  <ListGroup.Item key={el._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          className="img-fluid rounded smallimage"
                          src={el.product.image}
                          alt={el.product.name}
                        ></img>{' '}
                        <Link to={`/product/${el.product.slug}`}>
                          {el.product.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        <Row>
                          <Col md={2}>
                            <IconButton
                              disabled={el.numberproduct === 1}
                              onClick={() =>
                                reduxDispatch(decrement(el.product))
                              }
                            >
                              <RemoveCircleIcon />
                            </IconButton>
                          </Col>
                          <Col md={2}>{el.numberproduct}</Col>
                          <Col md={2}>
                            <IconButton
                              disabled={
                                el.product.countinstock <= el.numberproduct
                              }
                              onClick={() => {
                                if (el.product.countinstock > el.numberproduct)
                                  reduxDispatch(increment(el.product));
                                else
                                  window.alert(
                                    'sorry product is oout of stock'
                                  );
                              }}
                            >
                              <AddCircleIcon />
                            </IconButton>
                          </Col>
                        </Row>
                      </Col>
                      <Col>${el.product.price}</Col>
                      <Col>
                      <IconButton>
                        <DeleteIcon
                          onClick={() => reduxDispatch(remove(el.product))}
                        />
                        </IconButton>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>
                  subtotal({cart.number} items):${cart.totalprice}
                </h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={()=>navigate('/signin?redirect=/shipping')}> proccees to checkout</Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}
export default CartScreen;
