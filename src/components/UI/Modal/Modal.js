import React from 'react';
// import classes from '*.module.css';此行自动生成
import classes from './Modal.module.scss';

const modal = ( props ) => 
  <div 
    // className={classes.Modal + ' ' + classes.w}
    className={`${classes.w} ${classes.Modal}`}
    style={{
      transform: props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.purchasing ? '1' : '0'
    }} 
  >
    {props.children}
  </div>


export default modal;