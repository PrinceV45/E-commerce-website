import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-hot-toast';
import { getError } from '../utils';

const SignupScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Account created successfully');
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <section>
        <Helmet>
          <title>Sign Up</title>
        </Helmet>

        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="Trend-Bazaar-card">
            <form onSubmit={submitHandler}>
              <h1>Sign Up</h1>
              <div className="Trend-Bazaar-form">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                />
                <label htmlFor="email">Email or Mobile</label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="text"
                />
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  type="password"
                />
                <Button className="Trend-Bazaar-button" type="submit">
                  Continue
                </Button>
              </div>
            </form>
            <p className="text-center">
              By continuing you agree to Trend-Bazaar's{' '}
              <Link to="">Conditions of Use</Link> and{' '}
              <Link to="">Privacy Notice</Link>
            </p>
            <Link to={`/signin?redirect=${redirect}`}>
              <div className="text-center">
                <p>Already have an account?</p>
                <Button variant="light">Sign In</Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupScreen;
