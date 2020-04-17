import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

class LoginPage extends Component {
  state = {
    email: "",
    pw: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      alert("Invalid Inputs!");
    }
  };

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Email Adderss</label>
            <input type="email"
            placeholder="Email Address"
            autoComplete='off'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}/>
            <small id="emailHelp" className="form-text text-muted">
              Your information remains confidetial.
            </small>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              autoComplete="off"
              name="pw"
              value={this.state.pw}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary">Log In</button>
          &nbsp;&nbsp;&nbsp;
          <Link to="/">Cancel</Link>
        </form>
      </div>
    );
    } }
export default LoginPage;