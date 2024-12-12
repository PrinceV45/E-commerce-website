import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';

const Product = (props) => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    try {
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
        // Show toast notification for out of stock
        toast.error('Sorry, product is out of stock.');
        return;
      }

      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
      toast.success('Product added to cart!');
    } catch (error) {
      // Handle potential error from the server
      toast.error('Error adding to cart. Please try again.');
    }
  };

  return (
    <Card className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title style={{ fontSize: '15px' }}>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text style={{ fontSize: '14px', fontWeight: 'bold' }}>
          ${product.price}
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button
            className="btn-sm custom-button"
            onClick={() => addToCartHandler(product)}
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
