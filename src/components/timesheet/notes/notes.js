// @flow
import React from 'react';
import { map, isEmpty } from 'ramda';
import { days } from '../../../constants';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './notes.style.css';

type NotesProps = {
  updating: boolean,
  data: Object,
  getUserName: Function,
  handleStatusBtnClick: Function,
};

const Notes = ({
  updating = false,
  data,
  getUserName,
  handleStatusBtnClick,
}: NotesProps) => {
  if (isEmpty(data)) {
    return null;
  }

  const { 
    week_id,
    week_number,
    status,
    approved_by_date,
    approved_by_id,
    approvers,
    days_in_week
  } = data;
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="fadein"
      transitionAppear={true}
      transitionAppearTimeout={800}
      transitionEnter={false}
      transitionLeave={false}
    >
      <h3>Notes</h3>
      <div className="columns">
        <ul className="column">
          <li><strong>Week ID:</strong> {week_id}</li>
          <li><strong>Week N:</strong> {week_number}</li>
          <li><strong>Status:</strong> <span className={status}>{status}</span></li>
          <li><strong>Approved By:</strong> {getUserName(approved_by_id)}</li>
          <li><strong>Approved Date:</strong> {approved_by_date}</li>
          <li><strong>Approvers:</strong> {approvers && map(id => getUserName(id), approvers).join(', ')}</li>
        </ul>
        <table className="column">
          <tbody>
            {days_in_week && days_in_week.map(({ id, day_number, minutes, hours}, index) =>
              <tr key={id}>
                <th>{days[index] && days[index].name}, {day_number}:</th>
                <td>{`${hours}h:${minutes}min`}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="button btn-reject"
          disabled={(status === 'rejected') || updating}
          onClick={() => handleStatusBtnClick('rejected')}
        >
          Reject
        </button>
        <button
          type="button"
          className="button btn-approve"
          disabled={(status === 'approved') || updating}
          onClick={() => handleStatusBtnClick('approved')}
        >
          Approve
        </button>
      </div>
    </CSSTransitionGroup>
  );
}

export default Notes;
