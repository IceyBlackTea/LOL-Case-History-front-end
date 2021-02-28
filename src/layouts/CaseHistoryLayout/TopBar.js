import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  // Badge,
  Box,
  // Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Logo from '../../components/Logo';

// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
// import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(() => ({
  root: {},
  logo: {
    marginTop: 5,
  },
  title: {
    marginLeft: 20,
  },
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/case-history">
          <Logo />
        </RouterLink>
        <h2 className={classes.title}>LOL病历</h2>
        <Box flexGrow={1} />
        <IconButton
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
