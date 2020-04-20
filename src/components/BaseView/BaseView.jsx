import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './BaseView.css';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },

  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: '100%'
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },

  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 5,
    width: 20,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
});

const images = [
  {
    url: './images/login.png',
    title: 'login',
    width: '33%',
    path: '/login'
  },
  {
    url: './images/signup.png',
    title: 'sign up',
    width: '34%',
    path: '/signup'
  },
  {
    url: './images/about.png',
    title: 'about us',
    width: '33%',
    path: '/about'
  }
];

function ButtonBases(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {images.map(image => (
        <ButtonBase
        className={classes.image}
        key={image.title}
        to={image.path}
        focusVisibleClassName={classes.focusVisible}
        style={{width: image.width}}
        focusRipple
        >
          <Link to={image.path}>
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`
              }}
            />

            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>

              <Typography
                className={classes.imageTitle}
                component='span'
                color='inherit'
                variant='subtitle1'>

                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </Link>
        </ButtonBase>
      ))}
      <h1 style={{ color: 'rgb(97, 228, 237)' }}>DIY Center</h1>
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonBases);