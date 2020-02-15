import React from "react";
import { withRouter, NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="News Logo" className="logo" />
        <NavLink to="/" className="header-title">
          Hooks News
        </NavLink>
        <NavLink to="/" className="header-title">
          new
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-title">
          top
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-title">
          search
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/create" className="header-title">
          submit
        </NavLink>
      </div>
      <div className="flex">
        <NavLink to="/login" className="header-title">
          login
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(Header);
