import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./Toolbar.css";

const Toolbar = ({ children, location }) => {
  const path = location.pathname;

  return (
    <div className="toolbar">
      <Link to="/garden">
        <button className="toolbar__tab toolbar__tab--first" disabled={path === '/garden'}>My Garden</button>
      </Link>
      <Link to="/plant">
        <button className="toolbar__tab" disabled={path === '/plant'}>Plant Explorer</button>
      </Link>
      <div className="toolbar__filler"></div>
      {children}
    </div>
  );
};

export default withRouter(Toolbar);
