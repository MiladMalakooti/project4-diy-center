import React, { Component } from "react";
import { Link } from "react-router-dom";

class BaseView extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h2>DIY Center</h2>
          <div className='btn-group'>
            <Link className='btn btn-outline-primary' to='/signup'>Sign Up</Link>
            <Link className='btn btn-outline-info' to='/login'>Logn In</Link>
          </div>
          &nbsp;&nbsp;&nbsp;
          <img src="./images/main.png" alt="" />
        </div>
      </>
    );
  } 
}
export default BaseView;