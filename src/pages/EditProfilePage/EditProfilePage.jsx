import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import userService from "../../utils/userService";
import TextField from "@material-ui/core/TextField";

class SignupForm extends Component {
  state = {
    bio: '',
    pinterest: '',
    pinterest: '',
    instagram: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    userService.updateProfile(this.state);
    this.props.history.push(`/${userService.getUser().user_name}`);
  };

  render() {
    return (
      <div className="container">
      <div style={{height: '90px'}}></div>
        <form onSubmit={this.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            width: "70vw",
            padding: "30px",
            margin: "0 auto",
            borderRadius: "15px",
          }}
        >
         
          <TextField
            style={{ width: "50vw" }}
            label="Portfolio"
            margin="normal"
            variant="outlined"
            type="url"
            placeholder="Portfolio"
            value={this.state.instagram}
            name="instagram"
            onChange={this.handleChange}
          />
          <TextField
            style={{ width: "50vw" }}
            label="Git Hub"
            margin="normal"
            variant="outlined"
            type="url"
            placeholder="Git Hub"
            value={this.state.pinterest}
            name="pinterest"
            onChange={this.handleChange}
          />
          <TextField
            style={{ width: "50vw" }}
            label="LinkedIn"
            margin="normal"
            variant="outlined"
            type="url"
            placeholder="LinkedIn"
            value={this.state.pinterest}
            name="pinterest"
            onChange={this.handleChange}
          />
          <TextField
            style={{ width: "50vw" }}
            label="Tell others a little about yourself"
            margin="normal"
            variant="outlined"
            type="text"
            placeholder="Bio"
            value={this.state.bio}
            name="bio"
            onChange={this.handleChange}
            autoComplete='off'
          />
          <div>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              type='submit'
            >
              Submit
            </Button>
            &nbsp;&nbsp;
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;