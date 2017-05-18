// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { months, days } from '../../../constants';
import { generateCalendar, mergeCalendar } from '../../../utils/calendar.utils';
import Loading from '../../loading/loading';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './calendar.style.css';

type CalendarProps = {
  loading: boolean,
  loaded: boolean,
  selectedMonth: number,
  selectedYear: number,
  selectedWeek: Object,
  data: Array<Object>,
  handleNextMonth: Function,
  handlePrevMonth: Function,
  handleSelectWeek: Function
};

const Calendar = ({
  loading = false,
  loaded = false,
  selectedMonth,
  selectedYear,
  selectedWeek = {},
  data = [],
  handleNextMonth,
  handlePrevMonth,
  handleSelectWeek
}: CalendarProps) => {

  if(loading) {
    return <Loading />;
  }
  if(!loaded) {
    return null;
  }
  // move to reducer
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

  const todayDate = new Date();
  const numOfWeeksInMonth = calendarData.length;
  const renderWeek = (daysInWeek, weekIndex ) => {
    const isToday = (day_number) => (todayDate.getMonth() === selectedMonth - 1)
      && (todayDate.getFullYear() === selectedYear)
      && (todayDate.getDate() === day_number);
    // isOdd: day doesn't belong to selected month
    const isOdd = (day_number) => (weekIndex === 0 && day_number > 7)
      || (weekIndex === numOfWeeksInMonth - 1 && day_number < 7);
    return daysInWeek.map(({ id, day_number, hours, minutes }) =>
      <td
        key={id}
        className={`${isOdd(day_number) ? 'odd' : ''}${isToday(day_number) ? ' current' : ''}`.trim()}
      >
        {day_number}
        <p>
          {`${hours > 0 ? `${hours}h` : ''}${minutes > 0 ? `:${minutes}m` : ''}`}
        </p>
      </td>);
  }
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
          {calendarData.map((week, index) =>
            <tr 
              key={week.week_id}
              className={weekClassName(week)}
              onClick={week.data_exist ? () => handleSelectWeek(week) : () => {}}>
              <th>{week.week_number}<p /></th>
              {renderWeek(week.days_in_week, index)}
            </tr>
          )}
        </tbody>
      </table>
    </CSSTransitionGroup>
  );
}

export default Calendar;
