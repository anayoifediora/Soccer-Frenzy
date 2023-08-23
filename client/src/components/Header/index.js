import React from 'react';

import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link to={"/"}>
          <h1 className="m-0" 
              style={{ fontSize: '4rem', 
              fontWeight: "bolder", display: "flex", 
              justifyContent: "flex-start",
              color: 'var(--light-cyan)',
               }}>
            Soccer Frenzy
          </h1>
        </Link>
      </div>
      <div>
        <Navigation/>
      </div>
    </header>
  );
};

export default Header;
