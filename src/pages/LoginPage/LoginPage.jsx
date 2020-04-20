import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
        <form style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"}}
        >

        <TextField
            required
            onChange={this.handleChange}
            value={this.state.email}
            placeholder="Email"
            label="Email"
            margin="normal"
            variant="outlined"
            type="email"
            autoComplete="off"
            name="email"
            style={{ width: "50vw" }}
          />

          <small id="emailHelp" className="form-text text-muted">
            We Keep Your Information Safe
          </small>

          <TextField
            onChange={this.handleChange}
            value={this.state.pw}
            required
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="pw"
            style={{ width: "50vw" }}
          />
          <div>
            <Button 
            onClick={this.handleSubmit} 
            size="large" 
            variant="outlined" 
            color="primary"> Log In </Button>

            &nbsp;&nbsp;&nbsp;

            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}
export default LoginPage;