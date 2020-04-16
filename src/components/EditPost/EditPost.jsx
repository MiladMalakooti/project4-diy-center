import React, { Component } from "react";
import userService from "../../utils/userService";
import postService from "../../utils/postService";

class EditPost extends Component {
  state = {
    url: "",
    description: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const user = userService.getUser();
    const postCopy = { ...this.props.post };
    const userPosts = { ...this.props.userPosts };
    const newPostCopy = userPosts.posts.filter(post => {
      return post._id === postCopy._id;
    });


    newPostCopy[0].url = this.state.url;
    newPostCopy[0].caption = this.state.description;
    postService.updatePost(newPostCopy[0]);
    this.props.handlePostUpdate(userPosts);
    this.props.history.push(`/${user.user_name}`);
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Enter your Post's address</label>
            <input
              className="form-control"
              onChange={this.handleChange}
              placeholder="www.example.com"
              required
              type="url"
              name="url"
              value={this.state.url}
            />
          </div>
          <div className="form-group">
            <label>Enter a Description</label>
            <textarea
              className="form-control"
              onChange={this.handleChange}
              placeholder="This project is ..."
              name="description"
              cols="30"
              rows="10"
              value={this.state.description}
            />
          </div>
          <input className="btn btn-primary" type="submit" value="upload" />
        </form>
      </div>
    );
  }
}

export default EditPost;