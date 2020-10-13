import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { branding } = props;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger ">
        <Link className="navbar-brand" to="/">
          {branding}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <i className="fa fa-home" aria-hidden="true"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/about">
                <i className="fa fa-question" aria-hidden="true"></i> About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
