import React, { Component } from "react";
import styles from './HomePage.module.css'
import postService from '../../utils/postService';

class HomePage extends Component {
  async componentDidMount() {
      const posts = await postService.index();
      this.props.handleUpdatePosts(posts);
  }
  render() {
    return (
      <>
        {this.props.posts ? (
          this.props.posts.map((p,i) => (
            <div key={`p${i}`} className="card-panel blue-grey darken-1 white-text">
              <div key={p.user}>{p.user.user_name}</div>
              <iframe title={`title${i}`} className={styles.frame} key={p.url} src={p.url} />
              <div key={p.caption}>{p.caption}</div>
              <div key={`{comments${i}`}>{p.comments}</div>
              <div key={`likes${i}`}>{p.likes}</div>
              <button key={`p.btn${i}`} className="btn">Like</button>
              <input key={`commentInput${i}`} type="text" placeholder="comments..."/>
              <input key={`submit${i}`} className="btn" type="submit"/>
            </div>
          ))
        ) : (
          <img src="./images/loading3.gif" alt=""/>
        )}
      </>
    );
  } }
export default HomePage;