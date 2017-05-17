import React from 'react';
import PropTypes from 'prop-types';
import { months, days, getDaysPerMonth } from '../../../constants';
import { range, slice, sum, find, propEq } from 'ramda';

const DAYS_IN_WEEK = 7;

function generateCalendar(selectedMonth, selectedYear) {
  const daysPerMonth = getDaysPerMonth(selectedYear);
  const firstDayOfMonth = new Date(`${selectedMonth} 1, ${selectedYear}`);
  // get day of the week and adjust to start with Monday
  const firstDayOfTheWeek= firstDayOfMonth.getDay() === 0 ? DAYS_IN_WEEK : firstDayOfMonth.getDay();
  const numOfPrevMonthDays = firstDayOfTheWeek - 1;
  const numOfDaysInCurrentMonth = daysPerMonth[selectedMonth-1];
  const numOfDaysInPrevMonth = selectedMonth === 1 ?
    daysPerMonth[daysPerMonth.length - 1] :
    daysPerMonth[selectedMonth-2];


  const dates = [];
  // insert previous months days
  dates.push(...range((numOfDaysInPrevMonth + 1) - numOfPrevMonthDays, numOfDaysInPrevMonth + 1));
  // insert current months days
  dates.push(...range(1, numOfDaysInCurrentMonth + 1));
  const numOfWeeks = Math.ceil(dates.length / DAYS_IN_WEEK);
  const firstWeekNumber = Math.floor(sum(slice(0, selectedMonth - 1, daysPerMonth)) / DAYS_IN_WEEK) + 1;
  // generate a weeks object that contain dates.
  const weeks = [];
  for (let index = 0; index < numOfWeeks; index += 1) {
    // slice dates to weeks
    const weekDays = slice(index * DAYS_IN_WEEK,(index + 1) * DAYS_IN_WEEK, dates);
    weeks.push(
      {
        week_number: firstWeekNumber + index,
        week_id: index,
        days: weekDays
      }
    );
  }
  // rows left at the end
  const numOfNextMonthDays = 7 - weeks[numOfWeeks-1].days.length;
  if (numOfNextMonthDays > 0) {
    // insert next month dates
    weeks[numOfWeeks-1].days.push(...range(1, numOfNextMonthDays +1));
  }

  return weeks;
}

export default function Calendar({
  loading = false,
  loaded = false,
  selectedMonth,
  selectedYear,
  data = [],
  handleNextMonth,
  handlePrevMonth
}) {

  const renderWeek = (weekId, weekNumber, days) => {
    const weekData = find(propEq('week_number', weekNumber))(data);
    return (
      <tr key={weekId} className={weekData ? weekData.status : ''}>
        {days.map((day) =>
          <Day
            key={`${weekId}-${day}`}
            day={day}
            daysData={weekData ? weekData.days_in_week : null}
          />
        )}
      </tr>
    );
  }

  const calendarData = generateCalendar(selectedMonth, selectedYear);
  return (
    <div>
      {loading &&
        <div>loading</div>
      }
      {loaded &&
        <div>
          <button type="button" onClick={handlePrevMonth}>Prev</button>
          {`${months[selectedMonth-1].name} ${selectedYear}`}
          <button type="button" onClick={handleNextMonth}>Next</button>
          <table>
            <thead>
              <tr>
                {days.map(({ id, short_name }) => <td key={id}>{short_name}</td>)}
              </tr>
            </thead>
            <tbody>
              {calendarData.map(({ week_id, week_number, days }) =>
                renderWeek(week_id, week_number, days )
              )}
            </tbody>
          </table>
          
        </div>
      }
    </div>
  );
}

Calendar.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  data: PropTypes.array,
  handleNextMonth: PropTypes.func.isRequired,
  handlePrevMonth: PropTypes.func.isRequired
}

function Day({ day, daysData }) {
  if (!daysData) {
    return (
      <td >
        {day}
        <p>&nbsp;</p>
      </td>
    );
  }
  const dayData = find(propEq('day_number', day))(daysData);
  return (
    <td>
      {day}
      {dayData &&
        <p>{`${dayData.hours}h:${dayData.minutes}min`}</p>
      }
      {!dayData &&
        <p>&nbsp;</p>
      }
    </td>
  );
}

Day.propTypes = {
  day: PropTypes.number.isRequired,
  daysData: PropTypes.array,
}
