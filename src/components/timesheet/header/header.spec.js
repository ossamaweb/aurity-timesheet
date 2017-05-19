import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Header from './header';

function setup() {
  const props = {
    data: [{ id: 1, username: 'Ossama' }, { id: 2, username: 'Peter' }],
    loaded: true,
    currentUser: { id: 1, username: 'Ossama' },
    handleOnChange: jest.fn(),
  }

  const enzymeWrapper = mount(<Header {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Component: Header', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('h4').hasClass('header-title')).toBe(true);
    expect(enzymeWrapper.find('h4').text()).toBe('Welcome, Ossama!');
    expect(enzymeWrapper.find('select option').length).toEqual(3); // 3 because an empty option exist
   })

  it('should call handleOnChange if option changed', () => {
      const { enzymeWrapper, props } = setup();
      const select = enzymeWrapper.find('select');
      select.simulate('change');
      expect(props.handleOnChange.mock.calls.length).toBe(1);
    })
});
