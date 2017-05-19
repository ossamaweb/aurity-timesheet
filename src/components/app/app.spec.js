import React from 'react';
import { shallow } from 'enzyme';
import App from './app';
import TimesheetContainer from '../timesheet/timesheet.container';
import LoadingContainer from '../loading/loading.container';

describe('Component: App ', () => {
  it('renders TimesheetContainer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<TimesheetContainer />)).toEqual(true);
  });

  it('renders LoadingContainer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<LoadingContainer />)).toEqual(true);
  });
});
