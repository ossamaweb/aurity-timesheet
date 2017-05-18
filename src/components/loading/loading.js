import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import logo from '../app/logo.svg';
import './loading.style.css';

const Loading = () => {
  return (
    <CSSTransitionGroup
      component="div"
      className="loading"
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
export default Loading;
