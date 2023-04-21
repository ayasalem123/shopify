import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/loading';
import MessageBox from '../components/messageBox';
function reducer(state, action) {
  switch (action.type) {
    case 'send':
      return { ...state, loading: true };
    case 'fetchproducts':
      return { ...state, products: action.payload, loading: false };
    case 'error':
      return { ...state, error: action.payload };
    default:
      throw new Error();
  }
}

function Homepage() {
  const [{ products, loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    products: [],
    error: '',
  });

  const getproducts = async () => {
    dispatch({ type: 'send' });
    try {
      const products = await axios.get('http://localhost:5000/products');
      dispatch({ type: 'fetchproducts', payload: products.data });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };
  useEffect(() => {
    getproducts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>shop</title>
      </Helmet>
      <h1>list of products</h1>
      <div className="products">
        {error ? (
          <MessageBox variant={'danger'} message={error} />
        ) : loading === false ? (
          <Row>
            {products?.map((el) => {
              return (
                <Col key={el.slug} sm={6} md={4} lg={3}>
                  <Product product={el} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
export default Homepage;
