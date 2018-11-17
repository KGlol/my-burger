import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
  const ingredentSummary = Object.keys(props.ingredents)
    .map( ingKeys => 
    <li key={ingKeys}>
      <span style={{textTransform: "capitalize"}}>
        {ingKeys}: {props.ingredents[ingKeys]}
      </span>
    </li>);
  return (
    <Aux>
      <p>Your summary ingredents is below</p>
      <ul>
        {ingredentSummary}
      </ul>
      <p><strong>It costs: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.canceled}>Cancel</Button>
      <Button btnType="Success" clicked={() => props.continued(props.price.toFixed(2))}>Continue</Button>
    </Aux>
  )
}

export default orderSummary;