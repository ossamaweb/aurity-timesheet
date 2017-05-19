// @flow
import type { User, State, UIstate, updateUIstate } from '../../types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { fetchWeeks, selectWeek, updateStatus } from '../../actions/weeks';
import { find, propEq } from 'ramda';
import Header from './header/header';
import Calendar from './calendar/calendar';
import Notes from './notes/notes';
import Loading from '../loading/loading';

type TimesheetContainerProps = {
  usersData: Array<User>,
  usersUIstate: UIstate,
  currentUser: User,
  weeksData: Array<Object>,
  weeksUIstate: UIstate,
  weeksUpdateUIstate: updateUIstate,
  selectedMonth: number,
  selectedYear: number,
  selectedUser: ?number,
  selectedWeek: Object,
  fetchUsers: typeof fetchUsers,
  fetchWeeks: typeof fetchWeeks,
  selectWeek: typeof selectWeek,
  updateStatus: typeof updateStatus
};

// Use named export for unconnected component (for tests)
export class TimesheetContainer extends Component {

  static defaultProps = {
    currentUser: {},
    weeksData: [],
    selectedUser: null,
  };
  props: TimesheetContainerProps;

  handleSelectWeek: Function;
  handleSelectUser: Function;
  handlePrevMonth: Function;
  handleNextMonth: Function;
  handleSelectWeek: Function;
  handleStatusBtnClick: Function;
  getUserName: Function;

  constructor() {
    super();
    this.handleSelectUser = this.handleSelectUser.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handleSelectWeek = this.handleSelectWeek.bind(this);
    this.handleStatusBtnClick = this.handleStatusBtnClick.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  handleSelectUser(value: ?string) {
    if (value) {
      const { selectedMonth, selectedYear } = this.props;
      this.props.fetchWeeks(selectedMonth, selectedYear, parseInt(value, 10));
    }
  }

  handlePrevMonth() {
    const { selectedUser, selectedYear, selectedMonth } = this.props;
    let year = selectedYear;
    let month = selectedMonth - 1;
    if (selectedMonth === 1) {
      year -= 1;
      month = 12;
    }
    this.props.fetchWeeks(month, year, selectedUser);
  }

  handleNextMonth() {
    const { selectedUser, selectedYear, selectedMonth } = this.props;
    let year = selectedYear;
    let month = selectedMonth + 1;
    if (this.props.selectedMonth === 12) {
      year += 1;
      month = 1;
    }
    this.props.fetchWeeks(month, year, selectedUser);
  }

  handleSelectWeek(selectedWeek: Object) {
    this.props.selectWeek(selectedWeek);
  }

  handleStatusBtnClick(status: string) {
    if (!this.props.selectedWeek || !this.props.currentUser) {
      return;
    }
    const { selectedWeek: { week_id, approvers }, currentUser: { id } } = this.props;
    if (this.isApprover(id, approvers)) {
      this.props.updateStatus(week_id, id, status );
    } else {
      alert('Sorry, You are not one of the approvers!');
    }
    
  }

  isApprover(userId: number, approvers: Array<number>) {
    return ~approvers.indexOf(userId);
  }

  getUserName(userID: number) {
    const { usersData } = this.props;
    let userName = null;
    if (usersData && usersData.length > 0) {
      const user = find(propEq('id', userID))(usersData);
      if (user && user.username) {
        userName = user.username;
      }
    }
    return userName;
  }



  render() {
    const {
      usersData,
      usersUIstate,
      currentUser,
      weeksData,
      weeksUIstate,
      weeksUpdateUIstate,
      selectedMonth,
      selectedYear,
      selectedUser,
      selectedWeek
    } = this.props;
    if (usersUIstate.loading) {
      return <Loading />;
    }
    return (
      <div>
        <Header
          data={usersData}
          loaded={usersUIstate.loaded}
          currentUser={currentUser}
          selected={selectedUser}
          handleOnChange={this.handleSelectUser}
        />
        <Calendar
          loading={weeksUIstate.loading}
          loaded={weeksUIstate.loaded}
          data={weeksData}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          selectedWeek={selectedWeek}
          handleNextMonth={this.handleNextMonth}
          handlePrevMonth={this.handlePrevMonth}
          handleSelectWeek={this.handleSelectWeek}
        />
        <Notes
          updating={weeksUpdateUIstate.updating}
          data={selectedWeek}
          getUserName={this.getUserName}
          handleStatusBtnClick={this.handleStatusBtnClick}
        />
      </div>
    );
  }
}

export default connect(
  (state: State) => ({
    usersData: state.users.data,
    usersUIstate: state.users.UIstate,
    currentUser: state.users.currentUser,
    weeksData: state.weeks.data,
    weeksUIstate: state.weeks.UIstate,
    weeksUpdateUIstate: state.weeks.updateUIstate,
    selectedMonth: state.weeks.selectedMonth,
    selectedYear: state.weeks.selectedYear,
    selectedUser: state.weeks.selectedUser,
    selectedWeek: state.weeks.selectedWeek
  }),
  { fetchUsers, fetchWeeks, selectWeek, updateStatus },
)(TimesheetContainer);
