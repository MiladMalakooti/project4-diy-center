import React, {Component} from 'react';
import './SideNav.css'
import {Link} from 'react-router-dom';
import { fade } from '@material-ui/core/styles/colorManipulator';
import userService from '../../utils/userService';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200
      }
    },
    root: {
      width: '100%',
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper,
      margin: '0 auto'
    }
  });

class SideNav extends Component {
    state={
        user: '',
        users: userService.getAllUsers(),
        results: null,
        userLoggedIn:null
    };
    handleToggle = value => () =>{
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        }
            else { newChecked.splice(currentIndex, 1);
            }
            this.setState({
                checked: newChecked
            });
        };

    handleSearch = (evt) => {
        evt.preventDefault();
        const searchedUser = this.state.user
        const searchData = this.state.users.filter( u =>{
            if(u.user_name.includes(searchedUser)){
                return u;
            }
        })
        this.setState({results: searchData})
    }
    handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }
    async componentDidMount() {
        const users = await userService.getAllUsers(this.state.user);
        this.setState({users});
        const userLoggedIn = users.filter(u => {
            if (u._id === userService.getUser()._id){
                return u;
            }
            else return 0;
        });
        this.setState({userLoggedIn});
    }
  render() {
      const {classes}=this.props;
    return (
        <aside className='sideNav'>
            <form onSubmit={this.handleSubmit}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <searchIcon />
                    </div>
                    <InputBase
                    placeholder="Search users..."
                    classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                    }}
                    required
                    name="user"
                    margin="normal"
                    variant="outlined"
                    label="Search users"
                    autoComplete="off"
                    type="search"
                    value={this.state.user}
                    onChange={this.handleChange}
                    />
                </div>
            </form>
            {this.state.results && this.state.user ? (
          <>
            <List className={classes.root}>
              {this.state.results.map(value => (
                <Link to={`/profile/${value.user_name}`}>
                  <ListItem key={value} role={undefined} dense button>
                    <ListItemText primary={`${value.user_name}`} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </>
        ) : (
          <p />
        )}
        </aside>
    );
} }

export default withStyles(styles)(SideNav);