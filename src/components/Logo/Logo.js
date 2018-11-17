import React from 'react';

import Logo from '../../assets/images/burger-logo.png';//图片要加后缀名

import classes from './Logo.module.scss';

const logo = ( props ) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={Logo} alt={props.describle}/>
  </div>
);

export default logo;