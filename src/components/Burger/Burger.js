import React from 'react';
import BurgerIngredent from './BurgerIngredent/BurgerIngredent';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.scss';

const burger = ( props ) => {
  let transformedIngredents = Object.keys( props.ingredents )
    .map( ingKey => [...Array(props.ingredents[ingKey])]
      .map( (_, i) => <BurgerIngredent key={ingKey + i} type={ingKey} /> )
    ).reduce( (arr, el) => {
      return arr.concat(el)}, []);
  if ( transformedIngredents.length === 0 )  //transformIngredent数组长度为空时,输出提示；     
  {
    transformedIngredents = <p>Please add some ingredents</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredent type="bread-top" />  
      {transformedIngredents}
      <BurgerIngredent type="bread-bottom" />
    </div>
  );
}

export default withRouter(burger);

