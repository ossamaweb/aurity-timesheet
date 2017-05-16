import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import UserSelector from './user-selector/user-selector';

class TimesheetContainer extends Component {

  constructor() {
    super();
    this.handleSelectUser = this.handleSelectUser.bind(this);
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  handleSelectUser(event) {
    console.log('selected', event.target.value);
    //const user_id = event.target.value;
    //this.props.fetchUserData(month_number, year, user_id);
  }

  render() {
    const { usersData, usersUIstate } = this.props;
    if (usersUIstate.loading) {
      return <div>loading</div>;
    }
    return (
      <div>
        {usersUIstate.loaded &&
          <div>
            <UserSelector
              selected={1}
              data={usersData}
              handleOnChange={this.handleSelectUser}
            />
          </div>
        }
      </div>
    );
  }
}

TimesheetContainer.propTypes = {
  usersData: PropTypes.array,
  usersUIstate: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
}
TimesheetContainer.defaultProps = {
  usersData: [],
  selectedUserId: '',
}

export default connect(
  (state) => ({
    usersData: state.users.data,
    usersUIstate: state.users.UIstate,
  }),
  { fetchUsers },
)(TimesheetContainer);
