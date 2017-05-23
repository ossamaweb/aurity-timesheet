import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { TimesheetContainer } from './timesheet.container';
import Header from './header/header';
import Calendar from './calendar/calendar';
import Notes from './notes/notes';

const props = {
  usersData: [{ id: 1, username: 'Ossama' }, { id: 2, username: 'Peter' }],
  usersUIstate: { loaded: true, loading: false, error: null },
  weeksUIstate: { loaded: false, loading: false, error: null },
  weeksUpdateUIstate: { updating: false, updated: false, error: null },
  selectedWeek: {},
  selectedMonth: 3,
  getUserName: jest.fn(),
  fetchUsers: jest.fn(),
}

describe('Component: TimesheetContainer', () => {
  it('should render self and subcomponents', () => {
    const enzymeWrapper = mount(<TimesheetContainer {...props} />);

    const headerProps = enzymeWrapper.find(Header).props();
    expect(headerProps.data).toBe(props.usersData);

    const calendarProps = enzymeWrapper.find(Calendar).props();
    expect(calendarProps.selectedMonth).toBe(props.selectedMonth);

    const notesProps = enzymeWrapper.find(Notes).props();
    expect(notesProps.getUserName(1)).toEqual('Ossama');
   })

});
