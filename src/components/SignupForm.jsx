import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

class SignupForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConf: ""
  };

  handleChange = e => {
    this.props.updateMessage("");
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      // Invalid user data catcher
      this.props.updateMessage(err.message);
    }
  };

  isFormInvalid() {
    return !(
      this.state.name &&
      this.state.email &&
      this.state.password === this.state.passwordConf
      // all conditions should be true to go forward
    );
  }

  render() {
    return (
      <div>
        <header>Sign Up</header>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={this.state.passwordConf}
            name="passwordConf"
            onChange={this.handleChange}
          />
          <button disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
          <Link to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}
export default SignupForm;