import React, { Component } from "react";
import "./ProfilePage.css";
import postService from "../../utils/postService";
import { Route, Link, Switch } from "react-router-dom";
import EditPost from "../../components/EditPost/EditPost";

class ProfilePage extends Component {
  async componentDidMount() {
    const posts = await postService.userIndex();
    this.props.handleUpdateUserPosts(posts);
  }
  render() {
    return (
      <Switch>
        {this.props.userPosts ? (
          <div className="container">
            <h3>Hi {this.props.userPosts.first_name}</h3>
            <div>
              {this.props.userPosts.posts.reverse().map((p, i) => (
                <div key={`card${i}`}>
                  <div key={`profileName${i}`}>
                    {this.props.userPosts.first_name}{" "}
                    {this.props.userPosts.last_name}
                  </div>
                  <iframe
                    key={`frame${i}`}
                    title={`frameTitle${i}`}
                    src={p.url}
                  />
                  <Link
                    className="btn btn-success"
                    to={`/${this.props.userPosts.user_name}/edit-profile/${p._id}`}
                  >
                    Update Post
                  </Link>
                  <Route
                    exact
                    path={`/:${this.props.userPosts.user_name}/edit-profile/:${p._id}`}
                    render={({ history }) => (
                      <EditPost
                        history={history}
                        post={p}
                        userPosts={this.props.userPosts}
                        handlePostUpdate={this.props.handlePostUpdate}
                      />
                    )}
                  />
                  <button
                    onClick={() => this.props.handlePostDelete(p)}
                    className="btn btn-danger"
                  >
                    Delete Post
                  </button>
                  <div key={`likesLength${i}`}>{p.likes.length}Likes</div>
                  <div key={`commentsLength${i}`}>
                    {" "}
                    {p.comments.length}Comments
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <img src="./images/buffering.gif" alt="" />
        )}
      </Switch>
    );
  }
}
export default ProfilePage;
