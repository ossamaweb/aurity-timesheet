// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import logo from '../app/logo.svg';
import './loading.style.css';

type LoadingConatinerProps = {
  blockUI: boolean,
};
const LoadingConatiner = ({ blockUI = false }: LoadingConatinerProps) => {
  if (!blockUI) {
    return null;
  }
  return (
    <CSSTransitionGroup
      component="div"
      className="loading-container"
      transitionName="loading"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <img src={logo} className="loading-img" alt="loading" />
    </CSSTransitionGroup>
  );
}

export default connect(
  (state) => ({
    blockUI: state.app.blockUI,
  })
)(LoadingConatiner);
