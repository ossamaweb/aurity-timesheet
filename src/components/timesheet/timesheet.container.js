import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { fetchWeeks } from '../../actions/weeks';
import UserSelector from './user-selector/user-selector';
import Calendar from './calendar/calendar';

class TimesheetContainer extends Component {

  constructor() {
    super();
    this.handleSelectUser = this.handleSelectUser.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  handleSelectUser(event) {
    if (event.target.value) {
      const { selectedMonth, selectedYear } = this.props;
      this.props.fetchWeeks(selectedMonth, selectedYear, parseInt(event.target.value, 10));
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

  render() {
    const {
      usersData,
      usersUIstate,
      weeksData,
      weeksUIstate,
      selectedMonth,
      selectedYear,
      selectedUser
    } = this.props;

    if (usersUIstate.loading) {
      return <div>loading</div>;
    }
    return (
      <div>
        {usersUIstate.loaded &&
          <UserSelector
              selected={selectedUser}
              data={usersData}
              handleOnChange={this.handleSelectUser}
            />
        }
        <Calendar
          loading={weeksUIstate.loading}
          loaded={weeksUIstate.loaded}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          data={weeksData}
          handleNextMonth={this.handleNextMonth}
          handlePrevMonth={this.handlePrevMonth}
        />
      </div>
    );
  }
}

TimesheetContainer.propTypes = {
  usersData: PropTypes.array,
  usersUIstate: PropTypes.object.isRequired,
  weeksData: PropTypes.array,
  weeksUIstate: PropTypes.object.isRequired,
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  selectedUser: PropTypes.number,
  fetchUsers: PropTypes.func.isRequired,
  fetchWeeks: PropTypes.func.isRequired,
}
TimesheetContainer.defaultProps = {
  usersData: [],
  weeksData: [],
  selectedUser: null
}

export default connect(
  (state) => ({
    usersData: state.users.data,
    usersUIstate: state.users.UIstate,
    weeksData: state.weeks.data,
    weeksUIstate: state.weeks.UIstate,
    selectedMonth: state.weeks.selectedMonth,
    selectedYear: state.weeks.selectedYear,
    selectedUser: state.weeks.selectedUser
  }),
  { fetchUsers, fetchWeeks },
)(TimesheetContainer);
