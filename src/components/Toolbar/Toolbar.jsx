import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./Toolbar.css";

const Toolbar = ({ children, location }) => {
  const path = location.pathname;

  return (
    <div className="toolbar">
      <Link to="/garden">
        <button className="btn" disabled={path === '/garden'}>My Garden</button>
      </Link>
      <Link to="/plant">
        <button className="btn" disabled={path === '/plant'}>Plant Explorer</button>
      </Link>
      {children}
    </div>
  );
};

export default withRouter(Toolbar);
