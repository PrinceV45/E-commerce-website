import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Important for styles
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import logo from './components/Trend (1).png';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SignInScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { getError } from './utils';
import SerachBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import Loader from './components/Loader';
import Footer from './components/Footer';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [siderbarIsOpen, setSidebarIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
    <BrowserRouter>
      <div
        className={
          siderbarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <header>
          <Navbar
            variant="dark"
            expand="lg"
            className="navbar"
            style={{ opacity: '1', zIndex: '2500', color: '#4A4A4A' }}
          >
            <Container>
              <Button
                className="me-2"
                variant="dark"
                onClick={() => setSidebarIsOpen(!siderbarIsOpen)}
                style={{
                  backgroundColor: '#A7E3D1',
                  borderColor: '#A7E3D1',
                  color: '#000',
                }}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to={'/'}>
                <Navbar.Brand>
                  <div className="Trend-Bazaar-logo" style={{ color: 'black' }}>
                    <img src={logo} alt="logo" />
                  </div>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="border-0"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <SerachBox />
                <Nav
                  className="me-auto w-100 justify-content-end"
                  style={{ color: '#4A4A4A' }}
                >
                  <Link
                    to="/cart"
                    className="nav-link"
                    style={{ color: 'black' }}
                  >
                    <i className="fa fa-shopping-cart"></i>
                    {cart.cartItems.length > 0 && (
                      <Badge
                        pill
                        style={{ backgroundColor: 'darkgray', color: 'white' }}
                      >
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>

                  {userInfo ? (
                    <NavDropdown
                      title={<strong>{userInfo.name}</strong>}
                      id="basic-nav-dropdown"
                      className="nav-dropdown" // Apply this class to the NavDropdown
                    >
                      <LinkContainer to={'/profile'}>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/orderhistory'}>
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link signin-link" to="/signin">
                      <strong>Sign In</strong>
                    </Link>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown
                      title={<strong>Admin</strong>}
                      id="basic-nav-dropdown"
                      className="nav-dropdown"
                    >
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            siderbarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column my-2 w-100 sidebar-box">
            <div className="d-flex align-items-center">
              <p className="mb-0 me-2">
                Hello,&nbsp;
                <b>
                  {userInfo ? (
                    userInfo.name
                  ) : (
                    <Link
                      className="ms-2"
                      to={`/signin`}
                      style={{ color: 'white' }}
                    >
                      User
                    </Link>
                  )}
                </b>
              </p>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="btn closeBtn"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: '/search',
                    search: `category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main className="main-content pt-3">
          {loading && <Loader />}
          <Container>
            <Routes>
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route
                path="/forget-password"
                element={<ForgetPasswordScreen />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordScreen />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </main>
        <ToastContainer
          position="top-center" // Position the toast at the top-center
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
