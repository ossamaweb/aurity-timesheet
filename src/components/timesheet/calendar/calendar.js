// @flow
import React from 'react';
import { months, days } from '../../../constants';
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

  const weekClassName = ({ status, data_exist, week_id }) => {
    const isCurrent = (selectedWeek && selectedWeek.week_id === week_id);
    return `${status}${data_exist ? ' selectable' : ''}${isCurrent ? ' current' : ''}`
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
          {data.map((week, index) =>
            <tr 
              key={week.week_number}
              className={weekClassName(week)}
              onClick={week.data_exist ? () => handleSelectWeek(week) : () => {}}>
              <th>
                {week.week_number}
                <p />
              </th>
              {
                week.days_in_week.map(({ id, key, day_number, hours, minutes, is_odd, is_today }) =>
                  <td
                    key={key}
                    className={`${is_odd ? 'odd' : ''}${is_today ? ' current' : ''}`.trim()}
                  >
                    {day_number}
                    <p>
                      {`${hours > 0 ? `${hours}h` : ''}${minutes > 0 ? `:${minutes}m` : ''}`}
                    </p>
                  </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </CSSTransitionGroup>
  );
}

export default Calendar;
