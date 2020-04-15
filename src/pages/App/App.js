import "./App.css";
import React, { Component } from "react";
import userService from "../../utils/userService";
import postService from "../../utils/postService";
import BaseView from "../../components/BaseView/BaseView";
import NavBar from "../../components/Navbar/Navbar";
import SignupPage from "../SignupPage/SignupPage";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import HomePage from "../HomePage/HomePage";
import CreatePostPage from "../CreatePostPage/CreatePostPage";

class App extends Component {
  constructor() {
    super();
    this.state = { user: null, posts: null, userPosts: null };
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
                path="/"
                render={() =>
                  userService.getUser() ? (
                    <HomePage
                      Posts={this.state.posts}
                      user={userService.getUser()}
                      handleLogout={this.handleLogout}
                      handleUpdatePosts={this.handleUpdatePosts}
                    />
                  ) : (
                    <div />
                  )
                }
              />
              <Route
                exact
                path="/create-post"
                render={({ history }) =>
                  userService.getUser() ? (
                    <CreatePostPage
                      history={history}
                      user={userService.getUser()}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                path="/:username"
                render={props =>
                  userService.getUser() ? (
                    <ProfilePage
                      {...props}
                      user={userService.getUser()}
                      userIndex={this.state.userPosts}
                    />
                  ) : (
                    <LoginPage />
                  )
                }
              />
            </Switch>
          </div>
        ) : (
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