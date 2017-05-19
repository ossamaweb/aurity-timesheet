// @flow
import type { User } from '../../../types';
import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './header.style.css';

type HeaderProps = {
  data: Array<User>,
  loaded: boolean,
  currentUser: ?User,
  selected: ?number,
  handleOnChange: Function,
};

const Header = ({
  data,
  loaded = false,
  currentUser,
  selected,
  handleOnChange
}: HeaderProps) => {
  if (!loaded) {
    return null;
  }
  return (
    <CSSTransitionGroup
      component="div"
      className="header"
      transitionName="fadein"
      transitionAppear={true}
      transitionAppearTimeout={800}
      transitionEnter={false}
      transitionLeave={false}
    >
      <h4 className="header-title">Welcome, {currentUser && currentUser.username}!</h4>
      <form className="header-form">
        <label className="header-form-label">
          Select User:
          <select
            className="header-form-select"
            value={selected ? selected : ''}
            onChange={({ target: { value } }) => handleOnChange(value)}
          >
            <option value="">Please Select</option>
            {data && data.map(({ id, username }) =>
              <option key={id} value={id}>{username}</option>
            )}
          </select>
        </label>
      </form>
    </CSSTransitionGroup>
  );
}

export default Header;
