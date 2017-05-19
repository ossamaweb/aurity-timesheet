import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Header from './header';

describe('Component: Header', () => {
  const minProps = {
    data: [],
    loaded: true,
  }
  it('should render without exploding', () => {
    const wrapper = shallow(<Header {...minProps}/>);
    expect(wrapper.length).toEqual(1);
  });

  it('should render select', () => {
    const wrapper = shallow(<Header {...minProps}/>);
    expect(wrapper.find('select').length).toEqual(1);
  });

  it('should not render select', () => {
    const wrapper = shallow(<Header {...minProps} loaded={false}/>);
    expect(wrapper.find('select').length).toEqual(0);
  });

  it('should render select options', () => {
    const wrapper = shallow(<Header {...minProps} data={ [{ id: 1, username: 'Ossama'}] }/>);
    expect(wrapper.find('select option').length).toEqual(2); // 2 because an empty option exist
  });

  it('simulates change events', () => {
      const onSelectChange = sinon.spy();
      const wrapper = shallow(<Header {...minProps} data={ [{ id: 1, username: 'Ossama'}] } handleOnChange={onSelectChange}/>);
      wrapper.find('select').simulate('change');
      expect(onSelectChange.calledOnce).toEqual(true);
    });
});
