import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredents: {
      salad: 1,
      meat: 1,
      cheese:1,
      bacon:1
    }
  }

  checkoutCanceledHander = () => {
    // this.props.history.push('/');
    this.props.history.goBack();//返回后数据初始化
  }

  checkoutContiunedHander = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    return (
      <CheckoutSummary 
        ingredents={this.state.ingredents}
        checkoutContiuned={this.checkoutContiunedHander}
        checkoutCanceled={this.checkoutCanceledHander}
      />
    )
  }
}

export default Checkout;