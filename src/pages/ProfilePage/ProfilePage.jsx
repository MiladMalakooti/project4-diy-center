import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import postService from '../../utils/postService';
import userService from '../../utils/userService';
import './ProfilePage.css';
import EditPost from '../../components/EditPost/EditPost';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import SettingIcon from '@material-ui/icons/Settings';

const styles = theme => ({
  card: {
    maxWidth: '90%',
    margin: '20px 10%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // standard horizontal ratio (16 ÷ 9)
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '60vw'
  }
});

class ProfilePage extends Component {
  state = { expanded: false, comment: '', user_name: '', user_id: null, user: null };
  
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

    handleCommentSubmit = e => {
    e.preventDefault();
    const user = userService.getUser();
    let userPostsCopy = { ...this.props.userPosts };
    console.log(userPostsCopy);
    console.log(e.target.id);
    let postCopy = { ...userPostsCopy.posts[e.target.id] };
    console.log(postCopy);
    if (this.state.comment.length > 0) {
      postCopy.comments.push({
        comment: this.state.comment,
        user_name: user.user_name,
        user_id: user._id
      });
      postService.addComment({
        comment: this.state.comment,
        user_name: user.user_name,
        user_id: user._id,
        userInfo: user,
        postInfo: postCopy
      });
    }
    this.props.handleCommentSubmitOnProfile(userPostsCopy);
    this.setState({ comment: '' });
  };
  async componentDidMount() {
    const posts = await postService.userIndex();
    this.props.handleUpdateUserPosts(posts);
    const user = await userService.getUserFromServer();
    this.setState({ user });
  }


  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div style={{ height: '100px' }} />
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label='Recipe' className={classes.avatar}>
                {userService.getUser().first_name[0]}
              </Avatar>
            }
            action={
              <>
                <Link to={`/editprofile/${userService.getUser()._id}`}>
                  <IconButton>
                    <SettingIcon />
                  </IconButton>
                </Link>
              </>
            }
            title={
              userService.getUser().first_name +
              ' ' +
              userService.getUser().last_name
            }
            subheader={userService.getUser().user_name}
          />
          <CardContent>
            <Typography style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              {this.state.user ? (
                <>
                  <h6>{this.state.user.bio}</h6>
                  {this.state.user.instagram ? (
                    <a _blank href={this.state.user.instagram}>
                      <i class='fas fa-laptop-code icon' />
                    </a>
                  ) : (
                    <p />
                  )}
                  {this.state.user.pinterest ? (
                    <a _blank href={this.state.user.pinterest}>
                      <i class='fab fa-linkedin icon' />
                    </a>
                  ) : (
                    <p />
                  )}
                  {this.state.user.pinterest ? (
                    <a _blank href={this.state.user.pinterest}>
                      <i class='fab fa-github-square icon' />
                    </a>
                  ) : (
                    <p />
                  )}
                </>
              ) : (
                <p />
              )}
            </Typography>
          </CardContent>
        </Card>
        {this.props.userPosts ? (
          this.props.userPosts.posts.map((p, i) => (
            <Card
              className={classes.card}
              key={`card${i}`}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label='Recipe' className={classes.avatar}>
                    {this.props.userPosts.first_name[0]}
                  </Avatar>
                }
                action={
                  <>
                    <IconButton
                      onClick={() => this.props.handlePostDelete(p)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Link
                      to={`/${this.props.userPosts.user_name}/edit-profile/${
                        p._id
                      }`}
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </>
                }
                title={this.props.userPosts.user_name}
                // subheader={p.createdAt.replace(/T/, '  ').replace(/\..+/, '')}
              />
              <iframe title={`frameTitle${i}`} key={`frame${i}`} src={p.url} />
              <CardContent>
                <Typography>
                <h6 key={`likesLength${i}`}>
                    {p.likes.length}&nbsp;
                    <i className="fas fa-heart" />
                    &nbsp;&nbsp;&nbsp;&nbsp;{p.comments.length}&nbsp;
                    <i class="fas fa-comment" />
                  </h6>
                </Typography>
                {p.caption ? (
                  <Typography component='p'>
                    <span style={{ fontWeight: '900' }}>
                      {this.props.userPosts.user_name}:&nbsp;{' '}
                    </span>
                    {p.caption}
                  </Typography>
                ) : (
                  <p />
                )}
              </CardContent>
              <Route
                exact
                path={`/:${this.props.userPosts.user_name}/edit-profile/:${
                  p._id
                }`}
                render={({ history }) => (
                  <EditPost
                    history={history}
                    post={p}
                    userPosts={this.props.userPosts}
                    handlePostUpdate={this.props.handlePostUpdate}
                  />
                )}
              />
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label='Add to favorites'>
                  {p.likes.includes(userService.getUser()._id) ? (
                    <FavoriteIcon
                      color='secondary'
                      onClick={() => this.props.handleLikeBtnOnProfile(p._id)}
                    />
                  ) : (
                    <FavoriteIcon
                      onClick={() => this.props.handleLikeBtnOnProfile(p._id)}
                    />
                  )}
                </IconButton>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label='Show more'
                >
                  <CommentIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
                <CardContent>
                  <div key={`{comments${i}`}>
                    {p.comments ? (
                      p.comments.map((comment, idx) => (
                        <div key={`comment${i}in${idx}`}>
                          <Typography paragraph>
                            <Button
                              size='small'
                              color='inherit'
                              type='submit'
                              onClick={() =>
                                this.props.handleCommentDeleteOnProfile(
                                  p,
                                  comment
                                )
                              }
                            >
                              <i
                                style={{ fontSize: '20px' }}
                                className='fas fa-eraser'
                              />
                            </Button>
                            <span style={{ fontWeight: '900' }}>
                              {comment.user_name}
                            </span>
                            :&nbsp;
                            {comment.comment}
                          </Typography>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <h5>There aren't any comments yet</h5>
                    )}
                  </div>
                  <Typography>
                    <form>
                      <TextField
                        id='outlined-name'
                        label='Comment'
                        margin='normal'
                        variant='outlined'
                        required
                        className={classes.textField}
                        placeholder='comments...'
                        type='text'
                        name='comment'
                        value={this.state.comment}
                        onChange={this.handleChange}
                        key={`commentInput${i}`}
                      />
                      <button
                        key={`submit${i}`}
                        type='submit'
                        id={i}
                        style={{ height: '56px' }}
                        className='btn btn-outline-dark'
                        onClick={this.handleCommentSubmit}
                      >
                        Send&nbsp;
                        <i id={i} className='fas fa-paper-plane' />
                      </button>
                    </form>
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))
        ) : (
          <img style={{ margin: '0 auto' }} src='./images/loading.gif' alt='' />
        )}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);