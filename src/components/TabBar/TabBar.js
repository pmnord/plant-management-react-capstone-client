import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './TabBar.css';

const TabBar = ({ children, location }) => {
  const path = location.pathname;

  return (
    <div className='tab-bar'>
      <Link to='/garden'>
        <button
          className='tab-bar__tab tab-bar__tab--first'
          disabled={path === '/garden'}
        >
          Collection
        </button>
      </Link>
      <Link to='/plant'>
        <button className='tab-bar__tab' disabled={path === '/plant'}>
          Plant Search
        </button>
      </Link>
      <div className='tab-bar__filler'></div>
      {children}
    </div>
  );
};

export default withRouter(TabBar);
