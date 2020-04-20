import "./HomePage.css";
import React, { Component } from "react";
import Feed from "../../components/Feed/Feed";
import SideNav from "../../components/SideNav/SideNav";

class HomePage extends Component {
  render() {
    return (
      <main>
        <Feed
          className='Feed'
          posts={this.props.posts}
          user={this.props.user}
          handleCommentSubmit={this.props.handleCommentSubmit}
          handleLikeButton={this.props.handleLikeButton}
          handleLogout={this.props.handleLogout}
          handleUpdatePosts={this.props.handleUpdatePosts}
          handleCommentDelete={this.props.handleCommentDelete}
        />
        <SideNav className="sideNav" />
      </main>
    );
  }
}

export default HomePage;