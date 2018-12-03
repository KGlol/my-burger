import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.scss';


const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active >Burger</NavigationItem>
    <NavigationItem link="/checkout/contact-data" >Checkout</NavigationItem>
    
  </ul>
);

export default navigationItems;