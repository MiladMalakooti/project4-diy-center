import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

class SignupForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    user_name: "",
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
      this.props.updateMessage(err.message);
    }
  };

  isFormInvalid() {
    return !(
      this.state.first_name &&
      this.state.last_name &&
      this.state.user_name &&
      this.state.email &&
      this.state.password === this.state.passwordConf
    );
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor="exampleInputPassword">Enter Your First Name</label>
            <input
             type="text"
             className='form-control'
             placeholder='First Name'
             value={this.state.first_name}
             name='first_name'
             onChange={this.handleChange} />
          </div>

          <div className='form-control'>
            <label htmlFor="exampleInputPassword">Enter Your Last Name</label>
            <input type="text"
            className='form-control'
            placeholder='Last Name'
            value={this.state.last_name}
            name='last_name'
            onChange={this.handleChange} />
          </div>

          <div className='form-control'>
          <label htmlFor="exampleInputPassword">Choose a Username</label>
          <input
             type="text"
             className='form-control'
             placeholder='User Name'
             value={this.state.user_name}
             name='user_name'
             onChange={this.handleChange}
             />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Enter Your Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange} />
            </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Repeat password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Repeat Password"
            value={this.state.passwordConf}
            name="passwordConf"
            onChange={this.handleChange}/>
          </div>

          <button className="btn" disabled={this.isFormInvalid()}> Sign Up </button>
          &nbsp;&nbsp;
          <Link to="/">Cancel</Link>
        </form>
        </div>
    );
  } }
export default SignupForm