import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredents: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  }

  componentDidMount () {//接收search query的参数
    const query = new URLSearchParams(this.props.location.search);
    // console.log(query);
    const ingredents = {};
    for (let param of query) {//效果等同于(let param of query.entries())
      //['salad', '1']
      ingredents[param[0]] = +param[1];//字符串数字转换成字符串
    }
    console.log(ingredents);
    this.setState({ingredents: ingredents});
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
      <div>
        <CheckoutSummary 
          ingredents={this.state.ingredents}
          checkoutContiuned={this.checkoutContiunedHander}
          checkoutCanceled={this.checkoutCanceledHander}
        />
        <Route 
          path={this.props.match.url + '/contact-data'} 
          component={ContactData} 
        />
      </div>
    )
  }
}

export default Checkout;