import React, { useContext } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FirebaseContext } from "../firebase";

function Header() {
  const { user, firebase } = useContext(FirebaseContext);

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
        {user && (
          <React.Fragment>
            <div className="divider">|</div>
            <NavLink to="/create" className="header-title">
              submit
            </NavLink>
          </React.Fragment>
        )}
      </div>
      <div className="flex">
        {user ? (
          <React.Fragment>
            <div className="header-name">{user.displayName}</div>
            <div className="divider">|</div>
            <div className="header-button" onClick={() => firebase.logout()}>
              logout
            </div>
          </React.Fragment>
        ) : (
          <NavLink to="/login" className="header-title">
            login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
