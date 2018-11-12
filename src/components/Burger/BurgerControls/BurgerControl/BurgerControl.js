import React from 'react';

import classes from './BurgerControl.module.scss';

const burgerControl = ( props ) => 
  <div className={classes.BurgerControl}>
    <div className={classes.Label}>{props.label}</div>  
    <button 
    className={classes.More}  
    onClick={props.add}>
      More
    </button>
    <button //disable是html的默认属性名
    className={classes.Less}  
    onClick={props.remove}
    disabled={props.disabledInfo} >
      Less
    </button>
  </div>

  export default burgerControl;