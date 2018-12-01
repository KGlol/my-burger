import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer';

import classes from './Layout.module.scss';//写全文件名才不会出错

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false})
  }
  sideDrawerToggleHandler = (prevState) => {
    this.setState({showSideDrawer: !prevState.showSideDrawer})
  }

  render () { 
    return(
      <Aux>
        <Toolbar open={this.sideDrawerToggleHandler} />
        <SideDrawer 
          purchasing={this.state.showSideDrawer} 
          close={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;