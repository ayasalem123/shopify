import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../redux/cartReducer';
import Rating from '@mui/material/Rating';
function Product({ product }) {
  const { cart } = useSelector((state) => state);
  const reduxDispatch = useDispatch();
  const isElementExist = cart.elements.filter(
    (element) => element.product._id == product._id
  );
  console.log(isElementExist);
  return (
    <Card className="product">
      <Link to={`/product/${product.slug}`}>
        <img
          className="card-im-top"
          src={product.image}
          alt={product.name}
        ></img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating name="disabled" value={product.rating} disabled />
        <span style={{ color: '#f0c040' }}>{product.numReviews} reviews</span>
        <Card.Text>${product.price}</Card.Text>
        {isElementExist.length == 0 ||
        product.countinstock > isElementExist[0].numberproduct ? (
          <Button
            variant="primary"
            onClick={() => {
              reduxDispatch(increment(product));
            }}
          >
            add to cart{' '}
          </Button>
        ) : (
          <Button variant="light" disabled>
            out of stock{' '}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
