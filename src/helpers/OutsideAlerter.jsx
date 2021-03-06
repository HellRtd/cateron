import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
let isOutsideClicked = false;

export default class OutsideAlerter extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef=(node)=> {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside=(event)=> {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // console.log('You clicked outside of me!' + isOutsideClicked);
      // var element = document.getElementById('fab_menu');
      // element.classList.remove('active');
      return isOutsideClicked = true;
    }else{
      // console.log('Nope' + isOutsideClicked);
      return isOutsideClicked = false;
    }
  } 
  
  

  render() {
    return <section ref={this.setWrapperRef}>{this.props.children}</section>;
  }

 

}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};
export {isOutsideClicked};
