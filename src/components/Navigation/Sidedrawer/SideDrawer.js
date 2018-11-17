import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

import classes from './SideDrawer.module.scss';

const sideDrawer = ( props ) => {
  let sideDrawerStyles = props.purchasing ? 
    [classes.SideDrawer] : [classes.SideDrawer, classes.Close];
  return (
    <Aux>
      <Backdrop purchasing={props.purchasing} clicked={props.close} />
      <div className={sideDrawerStyles.join(" ")}>
        <Logo height="5%"/>
        <nav >
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
}
export default sideDrawer;