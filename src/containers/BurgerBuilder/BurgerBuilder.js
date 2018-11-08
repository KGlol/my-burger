import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {//此处传递的是数字
    meat: 2,
    cheese: 1,
    salad: 1,
    bacon: 2
  }
  render () {
    return ( 
      <Aux>
        <Burger ingredents={this.state}/>
        <div>Builder Controls</div>
      </Aux>
    )
  }
}

export default BurgerBuilder;