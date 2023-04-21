import { useParams } from 'react-router-dom';
import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '@mui/material/Rating';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/loading';
import MessageBox from '../components/messageBox';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../redux/cartReducer';
import { getError } from '../utils';
function reducer(state, action) {
  switch (action.type) {
    case 'send':
      return { ...state, loading: true };
    case 'fetchproduct':
      return { ...state, product: action.payload, loading: false };
    case 'error':
      return { ...state, error: action.payload };
    default:
      throw new Error();
  }
}
function Productscreen() {
  const params = useParams();
  const reduxDispatch = useDispatch();
  const { slug } = params;
  const { cart } = useSelector((state) => state);
  const [{ product, loading, error }, reducerDispatch] = useReducer(reducer, {
    loading: false,
    product: [],
    error: '',
  });

  const getproduct = async () => {
    reducerDispatch({ type: 'send' });
    try {
      const product = await axios.get(`http://localhost:5000/product/${slug}`);
      reducerDispatch({ type: 'fetchproduct', payload: product.data[0] });
    } catch (error) {
      reducerDispatch({ type: 'error', payload: getError(error) });
    }
  };
  useEffect(() => {
    getproduct();
  }, [slug]);
  const addToCartHandler = () => {
    const element = cart.elements.map((el) => {
      if (el.product._id == product._id) {
        return { product: el.product, numberproduct: el.numberproduct };
      }
    });
    console.log(element[0]);
    if (
      !element[0] ||
      element.length == 0 ||
      element[0]?.numberproduct  < product.countinstock
    ) {
      reduxDispatch(increment(product));
      console.log(product.countinstock);
      console.log(element[0]?.numberproduct);
    } else {
      console.log(product.countinstock);
      console.log(element[0]?.numberproduct);
      window.alert('sorry product is out of stock');
    }
  };
  return error ? (
    <MessageBox variant={'danger'} message={error} />
  ) : loading ? (
    <Loading />
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            src={product.image}
            alt={product.name}
            className="large-image"
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              {' '}
              <Rating name="disabled" value={product.rating} disabled />
              <span style={{ color: '#f0c040' }}>
                {product.numReviews} reviews
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              description: <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>satus:</Col>
                    <Col>
                      {product.countinstock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Sold Out</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countinstock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Productscreen;
