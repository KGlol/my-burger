import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/burger-logo.png';//图片要加后缀名

import classes from './Logo.module.scss';

const logo = ( props ) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <Link to="/">
    <img src={Logo} alt={props.describle}/>
    </Link>
  </div>
);

export default logo;