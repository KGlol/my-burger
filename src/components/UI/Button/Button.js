import React from 'react';

import classes from './Button.module.scss';

const button = ( props ) => (
  <button 
    className={[classes.Button, classes[props.btnType]].join(' ')}//本质上是传递字符串的数组
    onClick={props.clicked}//只能在组件中设置
  >
    {props.children}
  </button>
);

export default button;