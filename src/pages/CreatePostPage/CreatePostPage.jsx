import React, { Component } from 'react';
import postService from '../../utils/postService'


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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Enter Your Post's URL </label>
            <input
              name="url"
              className="form-control"
              placeholder="URL"
              required
              type="url"
              onChange={this.handleChange}
              value={this.state.url}
            />
          </div>

          <div className="form-group">
            <label>Description...</label>
            <textarea
              className="form-control"
              onChange={this.handleChange}
              placeholder="Description..."
              name="caption"
              cols="40"
              rows="20"
              value={this.state.caption}
            />
          </div>
          <input className="btn btn-primary" type="submit" value="upload" />
        </form>
      </div>
    );
  } }
export default CreatePostPage;