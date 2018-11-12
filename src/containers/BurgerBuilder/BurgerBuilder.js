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
    totalPrice: 4,
    purchasable: false//是否可定汉堡的变量
  }

  
  purchaseHandler = (ingredents) => {
    /**
     * 1. 以addIngredentHandler中的updateIngredents作为参数出入的目的是
     *    使purchaseHandler能够获得最新的this.state.ingredents,
     *    修正在其函数体内部通过...(展开操作符)获取this.state的老版本,
     *    bug原因: setstate 是异步的??
     * 
     * 2. purchaseHandler在addIngerdentHandler和removeIngrednetHandler中被调用,
     *    以此更新state.purchaseable的状态, 传递给BurgerControls的button的disbaled属性
     * 
     * 3. Object.values以数组的形式返回对象的值
     *  */
    // const ingredents = {
    //   ...this.state.ingredents
    // }
    const sum = Object.values(ingredents)
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
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
    this.purchaseHandler(updatedIngredents);
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
    this.purchaseHandler(updatedIngredents);
  }
  
  render () {
    //当数量小于等于0 时,disable button的变量
    const disabledInfo = {
      ...this.state.ingredents
    };
    // console.log(Object.values(disabledInfo)
    //   .reduce((sum, el) => {
    //     return sum + el;
    //   }, 0))
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };
    //{salad: true, cheese: false,...}
    return ( 
      <Aux>
        <Burger ingredents={this.state.ingredents} />
        <BurgerControls 
          add={this.addIngredentHandler} 
          remove={this.removeIngredentHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          disabled={this.state.purchasable} />
      </Aux>
    )
  }
}

export default BurgerBuilder;