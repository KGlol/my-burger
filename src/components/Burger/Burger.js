import React from 'react';
import BurgerIngredent from './BurgerIngredent/BurgerIngredent';

import classes from './Burger.module.scss';

const burger = ( props ) => {
  const transformedIngredents = Object.keys(props.ingredents)
    .map( ingKey => [...Array(props.ingredents[ingKey])]
      .map( (_, i) => <BurgerIngredent key={ingKey + i} type={ingKey} /> )
    );
  // console.log(Object.keys(props.ingredents).map(ingKeys => console.log(ingKeys, props.ingredents[ingKeys])));
  return (
    <div className={classes.Burger}>
      <BurgerIngredent type="bread-top" />  
      {transformedIngredents}
      <BurgerIngredent type="bread-bottom" />
    </div>
  );
}

export default burger;

