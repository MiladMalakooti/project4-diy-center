import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  return (
    <>
    <nav>
      <div className="navbar navbar-bright navbar-expand-lg">
        <Link to="/" className="navbar-brand"> DIY Center</Link>
        
        <button
          className="navbar-toggler" type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon" />
          </button>
          <div className= "collapse navbar-collapse" id="navbarNav">
            <ul className='navbar-nav'>
              <li className='nav-item'> 
                <Link className='nav-link' to=''>Search</Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to={`/${props.user.user_name}`}>Profile</Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/create-post'>Create Post</Link>
              </li>
              
              <li className='nav-item'>
                <Link className='nav-link' to='' onClink={props.handleLogout}>Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
     </nav>
  </>
 );
}

export default Navbar;
