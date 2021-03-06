import React, { Component } from 'react';
import axiosOrder from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.scss';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address:{
      street: '',
      postal: ''
    },
    loading: false
  }

  orderHandler = ( event ) => {
    event.preventDefault();//阻止表单默认操作(刷新页面)
    this.setState( { loading: true } );
    const order = {
    ingredents: this.props.ingredents,
    totalPrice: this.props.totalPrice,
    userName: 'kg',
    address: {
      country: 'China',
      city: 'shanghai',
      location: 'scscscscs'
    },
    deliveryMethod: 'fastest'
    }

    axiosOrder.post('/orders.json', order)
      .then( response => {
        this.setState( { loading: false } );
        this.props.history.push('/');} )
      .catch( error => this.setState( { loading: false } ) );
  }

  render () {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="postal" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    
    return (
      <div className={classes.ContactData}>
        <h4>Enter your information please</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;