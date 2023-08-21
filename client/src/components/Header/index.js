import React from 'react';

import Navigation from '../Navigation';

const Header = () => {
  return (
    <header className="mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <h1 className="m-0" 
            style={{ fontSize: '4rem', 
            fontWeight: "bolder", display: "flex", 
            justifyContent: "flex-start" }}>
          Soccer Frenzy
        </h1>
      </div>
      <div>
        <Navigation/>
      </div>
    </header>
  );
};

export default Header;
