import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>//导入App和导入Layout的差别?
    );
  }
}


export default App;
