import React,{ Component } from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

// import classes from '*.module.css';此行自动生成
import classes from './Modal.module.scss';

class Modal extends Component {

  shouldComponentUpdate( nextProps ) {
    //当OrderSummary组件的副父件的purchasing变化时,才会更新Modal和一起OrderSummary的更新,且不会影响其他功能
    return nextProps.purchasing !== this.props.purchasing || nextProps.children !== this.props.children;
  }

  render() {
    return (
    <Aux>
      <Backdrop 
        purchasing={this.props.purchasing}
        clicked={this.props.clicked}
      />
      <div 
        // className={classes.Modal + ' ' + classes.w}
        className={`${classes.Modal}`}
        style={{
          transform: this.props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.purchasing ? '1' : '0'
        }} 
      >
        {this.props.children}
      </div>
    </Aux>
    )
  }
}


export default Modal;