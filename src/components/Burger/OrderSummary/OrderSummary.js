import React from 'react';
import Aux from '../../../hoc/Aux';

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
      <p>Continue to Checkout?</p>
    </Aux>
  )
}

export default orderSummary;