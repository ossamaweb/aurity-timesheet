import React from 'react';
import PropTypes from 'prop-types';
import { months, days } from '../../../constants';
import { generateCalendar, mergeCalendar } from '../../../utils/calendar.utils';
import Loading from '../../loading/loading';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './calendar.style.css';

export default function Calendar({
  loading = false,
  loaded = false,
  selectedMonth,
  selectedYear,
  selectedWeek = null,
  data = [],
  handleNextMonth,
  handlePrevMonth,
  handleSelectWeek
}) {

  if(loading) {
    return <Loading />;
  }
  if(!loaded) {
    return null;
  }
  let calendarData = generateCalendar(selectedMonth, selectedYear);
  if (data && data.length > 0) {
    calendarData = mergeCalendar(calendarData, data);
  }

  const weekClassName = ({ status, data_exist, week_id }) => {
    let className = status;
    className += data_exist ? ' selectable' : '';
    className += selectedWeek && selectedWeek.week_id === week_id ? ' current' : '';
    return className
  };
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="fadein"
      transitionAppear={true}
      transitionAppearTimeout={800}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div className="calendar-buttons">
        <button type="button" className="button prev" onClick={handlePrevMonth}>Prev</button>
        <h3>{`${months[selectedMonth-1].name} ${selectedYear}`}</h3>
        <button type="button" className="button next" onClick={handleNextMonth}>Next</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>week</th>
            {days.map(({ id, short_name }) => <th key={id}>{short_name}</th>)}
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week) =>
            <tr 
              key={week.week_id}
              className={weekClassName(week)}
              onClick={week.data_exist ? () => handleSelectWeek(week) : () => {}}>
              <th>{week.week_number}<p /></th>
              {renderWeek(week.days_in_week)}
            </tr>
          )}
        </tbody>
      </table>
    </CSSTransitionGroup>
  );
}


function renderWeek(days_in_week) {
  return days_in_week.map(({ id, day_number, hours, minutes }) =>
    <td key={id}>
      {day_number}
      <p>
        {`${hours > 0 ? `${hours}h` : ''}${minutes > 0 ? `:${minutes}m` : ''}`}
      </p>
    </td>);
}

Calendar.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  selectedWeek: PropTypes.object,
  data: PropTypes.array,
  handleNextMonth: PropTypes.func.isRequired,
  handlePrevMonth: PropTypes.func.isRequired,
  handleSelectWeek: PropTypes.func.isRequired,
}
