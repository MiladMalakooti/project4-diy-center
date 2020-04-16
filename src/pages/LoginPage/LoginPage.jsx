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
      <div>
        <div className="row">
          <div className="col s12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <h1 className="card-title">DIY Center</h1>
                <header className="header-footer">Log In</header>
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    name="pw"
                    value={this.state.pw}
                    onChange={this.handleChange}
                  />
                  <button className="btn waves-effect waves-light #e65100 orange darken-4">
                    Log In
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <Link to="/">Cancel</Link>
                </form>
              </div>
              <div className="card-action">
                <Link to="/">back</Link>
                <Link to="">This is a link</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;