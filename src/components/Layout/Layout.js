import React from 'react';
import Aux from '../../hoc/Aux';

import classes from './Layout.module.scss';//写全文件名才不会出错

const layout = ( props ) => 
<Aux>
  Toolsbar
  Backdrop
  Sidedrawer
  <main className={classes.Content}>
    {props.children}
  </main>
</Aux>

export default layout;