import React, { Component } from "react";
import style from './HomePage.module.css'
import postService from '../../utils/postService';
import userService from "../../utils/userService";

class HomePage extends Component {
  state = {
    comment: '',
    user: userService.getUser()
  }
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  handleCommentSubmit = (e) => {
    e.preventDefault();
    const user = userService.getUser();
    let postsCopy = [...this.props.posts];
    let postCopy = {...postsCopy[e.target.id]};
    postCopy.comments.push({'comment': this.state.comment, 'user': user.user_name});
    postService.addComment({
      'comment': this.state.comment,
      'user': user.user_name,
      'userInfo': postCopy
    });
    this.props.handleCommentSubmit(postsCopy);
  }

  async componentDidMount() {
      const posts = await postService.index();
      this.props.handleUpdatePosts(posts);
  }
  render() {
    return (
      <>
        {this.props.posts ? (
          this.props.posts.map((p,i) => (
            <div key={`p${i}`} className = "container card" style={{width:'50rem'}}>
              <div className= 'row'>
                <div className= 'col-md-6'/>
                <p key={`user${i}`}>
                  {p.user[0].first_name} {p.user[0].last_name}
                </p>
                <iframe src={p.url} frameborder="0" title={`title${i}`} className={style.frame}/>
                <div className="col-md-6 offset-md-4">
                  <div key={p.caption}>
                     <span>{p.user[0].user_name}:&nbsp;</span>
                     {p.caption}
                  </div>
                  <div key={`{comments${i}}`}>
                    {p.comments ?(
                      p.comments.map((comment, idx) => (
                        <div key={`comment${i}in ${idx}`}>
                          <button className="btn btn-danger btn-sm" 
                            onClick={() => this.props.handleCommentDelete(p, comment)} 
                            type="submit" >
                              X</button>&nbsp;
                              <span>{comment.user}:&nbsp;</span>
                              <span>{comment.comment}</span>
                        </div>
                        ))
                      ) : ( <h4>Write First Comment</h4> )
                     }
                  </div>
                <div key={`likes${i}`}>{p.likes.length} Likes </div>
                <button
                    type="submit"
                    className="btn btn-danger"
                    key={`p.btn${i}`}
                    onClick={() => this.props.handleLikeButton(p._id)}>Like</button>
                  <form>
                    <input
                      key={`commentInput${i}`}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Comments..."
                      type="text"
                      name="comment"
                      id={`comment${i}`}
                      value={this.state.comment}/>
                      
                      <button
                        id={i}
                        key={`submit${i}`}
                        className="btn btn-primary"
                        onClick={this.handleCommentSubmit}
                        type="submit">Submit</button>
                  </form>

                </div>
              </div>
            </div>
          ) )
      ) : (
        <img src='./images/buffering.gif' alt=''/>
      )}
    </>
    );
  }
}

export default HomePage;
