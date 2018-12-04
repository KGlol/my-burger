import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredents: null,
    totalPrice: 0
  }

  componentWillMount () {
    //因为要传递queryparams的数据给ContactData组件,所以要在childComponent渲染前得到queryparams数据,以免出现bug
    const query = new URLSearchParams(this.props.location.search);
    // console.log(query);
    const ingredents = {};
    let price = 0;
    for (let param of query) {//效果等同于(let param of query.entries())
      //['salad', '1']
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredents[param[0]] = +param[1];//字符串数字转换成字符串
      }
    }
    console.log(ingredents);
    this.setState({ingredents: ingredents, totalPrice: price});
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
          render={(props) => 
            <ContactData 
              ingredents={this.state.ingredents} 
              totalPrice={this.state.totalPrice} 
              {...props} 
            />
          } 
        />
      </div>
    )
  }
}

export default Checkout;