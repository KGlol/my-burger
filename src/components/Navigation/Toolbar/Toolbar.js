import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button';

import classes from './Toolbar.module.scss';

const toolbar = (props) => ( 
  <header className={classes.Toolbar}>
    <Logo describle="burger-logo" />
    <Button 
      clicked={props.open}
      btnType="DrawerToggle"
    >
      <div></div>
      <div></div>
      <div></div>
    </Button>    
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
  )

export default toolbar;