import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Madol from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrder from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHander from '../../hoc/withErrorHander/withErrorHander';

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
    purchasable: false,//是否可定汉堡的变量
    purchasing: false,//是否弹出orderSummary的变量
    // loading: false,//显示ordersummary或者spinner
    ingredentsLoading: true
  }

  componentWillMount () {
    axiosOrder.get('/gredents.json')//.json不要忘记
      .then( response => {
        this.setState(( prevState ) => { 
          prevState.ingredents = response.data//解决异步性的问题
        });
        this.setState({ingredentsLoading: false});
      
        //grendents下就是内容,所以response.data中装的是内容
      //当state=null,且需要fetch后才能在组件中使用时(DidMount),组件中使用stste的变量在DidMount之前就要使用,所以会加载失败,
    })
  }
  
  purchasableHandler = ( ingredents ) => {
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

  //控制checkout button disable属性的函数
  purchasingHandler = () => {
    this.setState({purchasing: true});
    // console.log(this.state.purchasing);
  }
  //关闭Backdrop和Modal组件的控制函数
  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  //Modal组件中的continue按钮的事件处理函数
  purchaseContinueHandler = ( totalPrice ) => {
    //向Checkout组件传递ingredends参数
    const queryParams = [];
    for (let i in this.state.ingredents) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredents[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    // console.log(queryString),输出为bacon=0&cheese=0&meat=0&salad=1的字符串形式
    this.props.history.push({
      pathname: '/checkout',//pathname小写
      search:'?' + queryString
    });
  }

  addIngredentHandler = ( type ) => {
    const oldCount = this.state.ingredents[type];
    const updatedCount = oldCount + 1;
    const updatedIngredents = {
      ...this.state.ingredents
    };
    const totalPrice = this.state.totalPrice;
    updatedIngredents[type] = updatedCount;
    let gainPrice = totalPrice + INGREDENT_PRICES[type];
    this.setState({ingredents: updatedIngredents, totalPrice: gainPrice});
    this.purchasableHandler(updatedIngredents);
  }

  removeIngredentHandler = ( type ) => {
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
    this.purchasableHandler(updatedIngredents);
  }
  
  render () {
    //当数量小于等于0 时,disable button的变量
    const disabledInfo = {
      ...this.state.ingredents
    };
    //普通事件绑定实现modal的出现
    // const modal = (this.state.purchasing? 
    // <Madol>
    //   <OrderSummary ingredents={this.state.ingredents}/>
    // </Madol> : null);
    // console.log({modal});
    //////////////////////////////////////////////////////
    // console.log(Object.values(disabledInfo)
    //   .reduce((sum, el) => {
    //     return sum + el;
    //   }, 0))
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };
    //{salad: true, cheese: false,...}

    const orderSummary = this.state.loading ?
      <Spinner/> :  
      <OrderSummary 
        ingredents={this.state.ingredents} 
        price={this.state.totalPrice}
        canceled={this.purchaseCancelHandler} 
        continued={ this.purchaseContinueHandler}
      />;
    console.log(this.state.ingredentsLoading);
    const burgerBuilder = this.state.ingredentsLoading ?
      <Spinner /> :
      <Aux>
        <Burger ingredents={this.state.ingredents} />
        <BurgerControls 
          add={this.addIngredentHandler} 
          remove={this.removeIngredentHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          disabled={this.state.purchasable} 
          purchasing={this.purchasingHandler}
        />
      </Aux>

    return ( 
      <Aux> 
        <Madol 
          purchasing={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
            /** 样式应加在html元素上,而不是加在组件上
                * style={{transform: this.state.purchasing ? 
              'translateY(0)' : 'translateY(-100vh)',
              opacity:this.state.purchasing ? '1' : '0'}}
             */
        >
          {orderSummary}
        </Madol>
        {burgerBuilder}
      </Aux>
    )
  }
}

export default withErrorHander(BurgerBuilder, axiosOrder);