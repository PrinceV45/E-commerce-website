import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import logo from './logo.png';
import { Store } from '../Store';
import { toast } from 'react-hot-toast';
import { getError } from '../utils';

const SigninScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('sign in successfull');
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
      // alert('invalid email or password');
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
          <title>SignIn</title>
        </Helmet>
        {/* <div className="Trend-Bazaar-logo">
          <img src={logo} alt="" />
          <span>.in</span>
        </div> */}
        <div className="Trend-Bazaar-card">
          <form onSubmit={submitHandler}>
            {' '}
            <h1>Sign in</h1>
            <div className="Trend-Bazaar-from">
              <label>Email </label>
              <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />
              <br />
              <label>Password</label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
              <Button className="Trend-Bazaar-button" type="submit">
                Continue
              </Button>
            </div>
          </form>
          <p>
            By continuing you agree to Trend-Bazaar's{' '}
            <Link to="">Condition of Use</Link> and Policy Notice
          </p>
          <Link className="Trend-Bazaar-icon">Need help?</Link>{' '}
          <Link to={`/signup?redirect=${redirect}`}>
            <div>
              <div className="break">
                <p>New to Trend-Bazaar?</p>
              </div>{' '}
              <button type="button" className="newacc btn btn-sm btn-light">
                create new account
              </button>
            </div>
          </Link>
          <div className="mb-3">
            Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninScreen;
