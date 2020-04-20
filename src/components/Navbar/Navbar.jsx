
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  root: {
    width: '100%'
  },

  grow: {
    flexGrow: 1
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  icon: {
    margin: theme.spacing.unit * 2,
    padding: 0,
    fontSize: 30
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },

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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <Link to={`/${this.props.user.user_name}`}>
          <MenuItem onClick={this.handleMenuClose}>My Account</MenuItem>
        </Link>
        <Link to='' onClick={this.props.handleLogout}>
          <MenuItem onClick={this.handleMenuClose}>Log Out</MenuItem>
        </Link>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color='inherit'>
            <MailIcon />
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <Link style={{color: 'black', textDecoration: 'none'}} to='/createpost'>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color='inherit'>
            <AddIcon />
          </IconButton>
          <p>Upload project</p>
          
        </MenuItem>
        </Link>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color='inherit'>
            <NotificationsIcon />
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color='inherit'>
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar style={{backgroundColor: '#123C69', position: 'fixed'}} position='static'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              aria-label='Open drawer'
            >
              {/* <MenuIcon /> */}
            </IconButton>

            <Typography
              className={classes.title}
              variant='h6'
              color='inherit'
              noWrap
            >
              <Link className='links logo' to='/'>
                {/* <Home /> */}
                DIY Center
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color='inherit'>
                <MailIcon />
              </IconButton>
              <IconButton color='inherit'>
                <NotificationsIcon />
              </IconButton>
              <Link className='links' to='/createpost'>
                <IconButton color='inherit'>
                  <AddIcon />
                </IconButton>
              </Link>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup='true'
                onClick={this.handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup='true'
                onClick={this.handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);



// function Navbar(props) {
//   return (
//     <>
//     <nav>
//       <div className='navbar navbar-bright navbar-expand-lg'>
//         <Link to='/' className='navbar-brand'> DIY Center</Link>
        
//         <button
//           className='navbar-toggler' type='button'
//           data-toggle='collapse'
//           data-target='#navbarNav'
//           aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
//              <span className='navbar-toggler-icon' />
//           </button>
//           <div className= 'collapse navbar-collapse' id='navbarNav'>
//             <ul className='navbar-nav'>
//               <li className='nav-item'> 
//                 <Link className='nav-link' to=''>Search</Link>
//               </li>

//               <li className='nav-item'>
//                 <Link className='nav-link' to={`/${props.user.user_name}`}>Profile</Link>
//               </li>

//               <li className='nav-item'>
//                 <Link className='nav-link' to='/create-post'>Create Post</Link>
//               </li>
              
//               <li className='nav-item'>
//                 <Link className='nav-link' to='' onClick={props.handleLogout}>Log Out</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//      </nav>
//   </>
//  );
// }

// export default Navbar;
