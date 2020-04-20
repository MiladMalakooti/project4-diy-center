
import './App.css';
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import {Route } from 'react-router-dom';
import {Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import userService from '../../utils/userService';
import postService from '../../utils/postService';
import LoginPage from '../LoginPage/LoginPage';
import BaseView from '../../components/BaseView/BaseView';
import NavBar from '../../components/Navbar/Navbar';
import HomePage from '../HomePage/HomePage';
import ProfilePage from '../ProfilePage/ProfilePage';
import CreatePostPage from '../CreatePostPage/CreatePostPage';
import UserSearchedProfile from '../UserSearchedProfile/UserSearchedProfile'

class App extends Component {
  constructor() {
    super();
    this.state = { 
      user: null, 
      posts: null, 
      userPosts: null };
  }
  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };
  handleUpdatePosts = posts => {
    this.setState({ posts });
  };
  handleUpdateUserIndex = userPosts => {
    this.setState({ userPosts });
  };

  handleLikeButton = postId => {
    let postsCopy = [...this.state.posts];
    let userCopy = { ...this.state.user };
    postsCopy.forEach(async p => {
      if (p._id === postId) {
        if (p.likes.includes(userCopy.email)) {
          p.likes.splice(userCopy.email, 1);
        } else {
          p.likes.push(userCopy.email);
        }
        await postService.addLike({ postId: p._id, userCopy });
      }
    });
    this.setState({ posts: postsCopy });
  };

  handleCommentSubmit = (posts) => {
    this.setState({posts});
  };

  handleCommentSubmitOnProfile = userPosts => {
    this.setState({ userPosts });
  };

  handleCommentDelete = (post, comment) => {
    let postsCopy = [...this.state.posts];
    let postCopy = postsCopy.filter( p=> {return p._id === post._id});
    
    const commentsCopy = postCopy[0].commentsfilter((c) => {
      return c._id !== comment._id
    });
    postCopy[0].comments=commentsCopy;
    postService.removeComment({post, comment});
    this.setState({posts: postsCopy});
  };





  handlePostDelete = (post) => {
    const userPostsCopy = {...this.state.userPosts}
    const userPosts = this.state.userPosts.posts.filter( (p)=>{
      return p._id !== post._id
    })
    postService.deletePost(post)
    userPostsCopy.posts = userPosts;
    this.setState({userPosts: userPostsCopy})
  }
  handlePostUpdate = (userPosts) => {
    this.setState({userPosts})
  }




  handleLikeOnProfile = postId =>{
    let postsCopy = {...this.setState.userPosts};
    let userCopy = {...this.state.user};
    postsCopy.posts.forEach(async p =>{
      if (p._id === postId){
        if (p.likes.includes(userCopy.email)) {
          p.likes.splice(userCopy.email, 1);
        } else{ p.likes.push(userCopy.email);
          }
          await postService.addLike({
            postId: p._id, userCopy
          });
      }
    });
    this.setState({userPosts: postsCopy});
  }

    handleCommentDeleteOnProfile = (post, comment) => {
    let userPosts = {...this.state.userPosts};
    const postCopy = userPosts.posts.filter( p => { return p._id === post._id} );
    console.log(postCopy)
    const commentsCopy = postCopy[0].comments.filter( c => c._id !== comment._id)
    console.log(commentsCopy)
    postCopy[0].comments = commentsCopy;
    postService.removeComment({post, comment});
    this.setState({userPosts: userPosts});
  }
  async componentDidMount() {
    const user = userService.getUser();
    const posts = await postService.index();
    const userPosts = await postService.userIndex();
    this.setState({ user, posts, userPosts });
  }
  


  render() {
    return (
      <div>
        {userService.getUser() ? (
          <div>
            <NavBar
              user={userService.getUser()}
              handleLogout={this.handleLogout}
            />
            <Switch>
              <Route
                exact
                path='/'
                render={() =>
                  userService.getUser() ? (
                    <HomePage
                      posts={this.state.posts}
                      user={userService.getUser()}
                      handleCommentSubmit={this.handleCommentSubmit}
                      handleLikeButton={this.handleLikeButton}
                      handleCommentDelete={this.handleCommentDelete}
                      handleUpdatePosts={this.handleUpdatePosts}
                      handleLogout={this.handleLogout}
                    />
                  ) : (
                    <div />
                  )
                }
              />
              <Route
                exact
                path='/create-post'
                render={({ history }) =>
                  userService.getUser() ? (
                    <CreatePostPage
                      history={history}
                      user={userService.getUser()}
                    />
                  ) : (
                    <Redirect to='/login' />
                  )
                }
              />
              <Route
                path='/:username'
                render={props =>
                  userService.getUser() ? (
                    <UserSearchedProfile
                      {...props}
                      users={userService.getAllUsers()}
                    />
                  ) : (

                    <Redirect to='/login' />
                  )
                }
              />

              <Route
              path='/:username'
              render={props => userService.getUser() ? (
                <ProfilePage
                {...props}
                user={userService.getUser()}
                userPosts={this.state.userPosts}
                handleCommentSubmitOnProfile={this.handleCommentSubmitOnProfile}
                handleLikeBtnOnProfile={this.handleLikeBtnOnProfile}
                handleCommentDeleteOnProfile={this.handleCommentDeleteOnProfile}
                handlePostUpdate={this.handlePostUpdate}
                handlePostDelete={this.handlePostDelete}
                handleUpdateUserPosts={this.handleUpdateUserPosts}
                /> ):( <LoginPage /> ) }
              />
              </Switch>
            </div> ) : (

              <div>
              <BaseView />
              <Switch>
                <Route
                  exact
                  path="/login"
                  render={({ history }) => (
                    <LoginPage
                      history={history}
                      handleSignupOrLogin={this.handleSignupOrLogin}
                    />
                  )}
                />
                
                <Route
                  exact
                  path="/signup"
                  render={({ history }) => (
                    <SignupPage
                      history={history}
                      handleSignupOrLogin={this.handleSignupOrLogin}
                    />
                  )}
                />
              </Switch>
            </div>
          )}
        </div>
      );
    }
  }
  
  export default App;