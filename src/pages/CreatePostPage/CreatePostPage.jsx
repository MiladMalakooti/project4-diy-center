import React, { Component } from 'react';
import postService from '../../utils/postService';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


class CreatePostPage extends Component {
  state = {
    url:'',
    caption:'',
    user: this.props.user
  };
  handleChange = e =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e =>{
    e.preventDefault();
    try{
      await postService.create_post(this.state);
      this.props.history.push('/');
    }
    catch (err){ }
  };

  render() {
    return (
      <div className="container">
        <div style={{height: '100px'}} />
        <form onSubmit={this.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}>

          <TextField
          required
          onChange={this.handleChange}
          placeholder="Project's URL..."
          fullWidth
          id="outlined-name"
          label="Project's URL"
          margin="normal"
          variant="outlined"
          type="url"
          name="url"
          value={this.state.url} />

            <br />
          <TextField
            required
            value={this.state.caption}
            onChange={this.handleChange}
            fullWidth
            placeholder="Description"
            name="caption"
            margin="normal"
            variant="outlined"
            id="outlined-name"
            label="Description"
          />

            <br />
          <div>
            <Button
              value="upload"
              type="submit"
              size="large"
              variant="outlined"
              color="primary"
            >
              Post &nbsp;
              <i className="fas fa-cloud-upload-alt" />
            </Button>
            <Link style={{ marginLeft: "20px" }} to="/">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePostPage;