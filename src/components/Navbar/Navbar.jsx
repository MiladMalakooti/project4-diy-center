import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          <i className="material-icons"></i>DIY Center
        </Link>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="">
              <i className="material-icons">search</i>
            </Link>
          </li>
          <li>
            <Link to={`/${props.user.user_name}`}>
              <i className="material-icons">view_module</i>
            </Link>
          </li>
          <li>
            <Link to="/create-post">
              <i className="material-icons">file_upload</i>
            </Link>
          </li>
          <li>
            <Link to="" onClick={props.handleLogout}>
              <i className="material-icons">keyboard_backspace</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </>
 );
}

export default Navbar;