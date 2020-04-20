import React, { Component } from 'react';
import userService from '../../utils/userService';
import postService from '../../utils/postService';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'

class EditPost extends Component {
  state = {
    url: '',
    description: ''
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
        <form onSubmit={this.handleSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
        
        <TextField id="outlined-name"
          required
          label="Project's URL"
          placeholder="Project's URL"
          margin="normal"
          value={this.state.url}
          onChange={this.handleChange}
          type="url"
          name="url"
          variant="outlined"
          style={{width: '75vw'}}
        />
        <br />

        <TextField
          required
          label="Description"
          placeholder="Description"
          margin="normal"
          value={this.state.description}
          onChange={this.handleChange}
          name="description"
          variant="outlined"
          style={{width: '75vw'}}
          cols="30"
          rows="10"
        />
        <br />

        <div>
          <Button
            type="submit"
            size="large"
            variant="outlined"
            color="primary"> Finish </Button>
          &nbsp;&nbsp;&nbsp;
          <Link to={`/${userService.getUser().user_name}`}>Cancel</Link>
        </div>
      </form>
    );
  }
}

export default EditPost;