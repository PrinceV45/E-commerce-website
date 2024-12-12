import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logo from './TREND.png';
import '../../src/footer.css';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { getError } from '../utils';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="footer">
      {loading}
      <section>
        <Container className="container">
          <div className="logo2">
            <img src={logo} alt="footer/logo" />
          </div>
          <Nav className="nav" style={{ color: '#4A4A4A' }}>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: '/search',
                    search: `category=${category}`,
                  }}
                >
                  <Nav.Link style={{ color: '#4A4A4A' }}>
                    {' '}
                    <strong>{category}</strong>
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}

            <Nav.Item>
              <Nav.Link>Puma</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Adidas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Nike</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Firebolt</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Cadbury</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Cocacola</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link>Conditions of Use & Sale</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link>Privacy Notice</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link>Interest-Based Ads</Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="copyright">
            <p>
              &copy; <a target="blank">Trend-Bazaar.com</a> - Prince V. Bhalodiya{' '}
              <br /> All Rights Reserved 2023
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Footer;
