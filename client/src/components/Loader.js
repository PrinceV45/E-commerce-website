import React from 'react';
import logo from './Trend (2).png';
const Loader = () => {
  return (
    <div className="loader">
      <img src={logo} alt="Loading..." />
      <br />

      <p>Please wait as we load your data...</p>
    </div>
  );
};

export default Loader;
