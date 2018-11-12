import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';

import classes from './BurgerControls.module.scss';

const controls = [
  {label: 'Meat', type: 'meat'},
  {label: 'Salad', type: 'salad'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'}
]

const burgerControls = ( props ) => 
  <div className={classes.BurgerControls}>
    <p>Current Price: <strong><em>{props.price.toFixed(2)/**修复小数问题 */}</em></strong></p>
    {controls.map( 
      control => <BurgerControl 
                  key={control.label} 
                  label={control.label}
                  add={() => props.add(control.type)}
                  remove={() => props.remove(control.type)}
                  disabledInfo={props.disabledInfo[control.type]} />)
    }
    <button 
    className={classes.OrderButton}
    disabled={!props.disabled}>Order Now</button>
  </div>

export default burgerControls;