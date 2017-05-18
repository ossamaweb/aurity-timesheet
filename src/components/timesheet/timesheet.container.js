// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { fetchWeeks, selectWeek, updateStatus } from '../../actions/weeks';
import { find, propEq } from 'ramda';
import Header from './header/header';
import Calendar from './calendar/calendar';
import Notes from './notes/notes';
import Loading from '../loading/loading';

type TimesheetContainerProps = {
  usersData: Array<Object>,
  usersUIstate: Object,
  currentUser: ?Object,
  weeksData: Array<Object>,
  weeksUIstate: Object,
  weeksUpdateUIstate: Object,
  selectedMonth: number,
  selectedYear: number,
  selectedUser: ?number,
  selectedWeek: Object,
  fetchUsers: typeof fetchUsers,
  fetchWeeks: typeof fetchWeeks,
  selectWeek: typeof selectWeek,
  updateStatus: typeof updateStatus
};

class TimesheetContainer extends Component {

  static defaultProps = {
    usersData: [],
    currentUser: {},
    weeksData: [],
    selectedUser: null,
  };
  props: TimesheetContainerProps;

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

  handleSelectUser = (event) => {
    if (event.target.value) {
      const { selectedMonth, selectedYear } = this.props;
      this.props.fetchWeeks(selectedMonth, selectedYear, parseInt(event.target.value, 10));
    }
  }

  handlePrevMonth = () => {
    const { selectedUser, selectedYear, selectedMonth } = this.props;
    let year = selectedYear;
    let month = selectedMonth - 1;
    if (selectedMonth === 1) {
      year -= 1;
      month = 12;
    }
    this.props.fetchWeeks(month, year, selectedUser);
  }

  handleNextMonth = () => {
    const { selectedUser, selectedYear, selectedMonth } = this.props;
    let year = selectedYear;
    let month = selectedMonth + 1;
    if (this.props.selectedMonth === 12) {
      year += 1;
      month = 1;
    }
    this.props.fetchWeeks(month, year, selectedUser);
  }

  handleSelectWeek = (selectedWeek) => {
    this.props.selectWeek(selectedWeek);
  }

  handleStatusBtnClick = (status) => {
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

  isApprover(userId, approvers) {
    return ~approvers.indexOf(userId);
  }

  getUserName = (userID) => {
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
  (state) => ({
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
