import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

//组件使用时 在export时包裹目标组件 export default withErrorHander(WrappedComponent)
const withErrorHander = ( WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error: null//控制error信息在Madol中的显示
    }
    componentDidMount () {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      }); 
      this.resInterceptors = axios.interceptors.response.use(res => res, error => {//最短的箭头函数返回方法
        this.setState({error: error})
      });
    }

    //高阶组件withErrorHander被多次使用时,每次使用的interceptors始终存在于内存中,会引起错误或者内存泄漏
    //解决办法: withErrorHander不使用时即消除自己的interceptors
    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {//注意使用箭头函数,普通函数在组件中this的指向不同
      this.setState({error: null});
    }

    render () {
      return (
        <React.Fragment>
          <Modal 
            purchasing={this.state.error}
            clicked={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}{/**error不存在时,error.message将被输出为undefined */}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }
}

export default withErrorHander;