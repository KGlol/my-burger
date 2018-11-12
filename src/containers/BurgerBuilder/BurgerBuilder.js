import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';

const INGREDENT_PRICES = {//全局参数
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}
class BurgerBuilder extends Component {
  state = { 
      ingredents: {//此处传递的是数字
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon: 0
    },
    totalPrice: 4
  }

  addIngredentHandler = (type) => {
    const oldCount = this.state.ingredents[type];
    const updatedCount = oldCount + 1;
    const updatedIngredents = {
      ...this.state.ingredents
    };
    const totalPrice = this.state.totalPrice;
    updatedIngredents[type] = updatedCount;
    let gainPrice = totalPrice + INGREDENT_PRICES[type];
    this.setState({ingredents: updatedIngredents, totalPrice: gainPrice});
  }

  removeIngredentHandler = (type) => {
    const oldCount = this.state.ingredents[type];
    if ( oldCount <= 0 ) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredents = {
      ...this.state.ingredents
    };
    const totalPrice = this.state.totalPrice;
    updatedIngredents[type] = updatedCount;
    let deduction = totalPrice - INGREDENT_PRICES[type];
    this.setState({ingredents: updatedIngredents, totalPrice: deduction});
  }
  
  render () {
    //当数量小于等于0 时,disable button的变量
    const disabledInfo = {
      ...this.state.ingredents
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    };
    //{salad: true, cheese: false,...}
    return ( 
      <Aux>
        <Burger ingredents={this.state.ingredents} />
        <BurgerControls 
          add={this.addIngredentHandler} 
          remove={this.removeIngredentHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice} />
      </Aux>
    )
  }
}

export default BurgerBuilder;