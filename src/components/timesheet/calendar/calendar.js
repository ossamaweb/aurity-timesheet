import React from 'react';
import PropTypes from 'prop-types';
import { months, days, getDaysPerMonth } from '../../../constants';
import { range, slice, sum, find, propEq, forEach, isNil } from 'ramda';

const DAYS_IN_WEEK = 7;

function generateWeeksObjects(data) {
  const weeks = [];
  const generateWeeksObjects = ({ week_id, week_number, days_in_week }) => {
    const daysObjet = [];
    const generateDaysObjects = (day_number) => {
      const dayObject = {
        day_number,
        id: `${week_number}${day_number}`,
        hours: null,
        minutes: null
      };
      daysObjet.push(dayObject);
    };

    forEach(generateDaysObjects, days_in_week);
    const weekObject = {
      week_id,
      week_number,
      days_in_week: daysObjet
    };      
    weeks.push(weekObject);
  };
    
  forEach(generateWeeksObjects, data);
  return weeks;
}

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
        days_in_week: weekDays
      }
    );
  }
  // rows left at the end
  const numOfNextMonthDays = 7 - weeks[numOfWeeks-1].days_in_week.length;
  if (numOfNextMonthDays > 0) {
    // insert next month dates
    weeks[numOfWeeks-1].days_in_week.push(...range(1, numOfNextMonthDays +1));
  }

  return generateWeeksObjects(weeks);
}

function mergeDays(weekDays, apiWeekDays) {
  const mergedDays = [];
  const mergeDayObject = (week) => {
    const apiDays = find(propEq('day_number', week.day_number))(apiWeekDays);
    if (apiDays) {
      mergedDays.push(apiDays);
    } else {
      mergedDays.push(week);
    }

  };
  forEach(mergeDayObject, weekDays);
  return mergedDays;
}

function mergeCalendar(calendarData, apiData) {
  let mergedData = [];
  const mergeWeekObject = (week) => {
    const apiWeek = find(propEq('week_number', week.week_number))(apiData);
    console.log('apiWeek', apiWeek);
    if (apiWeek) {
      const mergedDays =  mergeDays(week.days_in_week, apiWeek.days_in_week);
      apiWeek.days_in_week = mergedDays;
      mergedData.push(apiWeek);
    } else {
      mergedData.push(week);
    }

  };
  // loop through calendar data and merge existing api weeks
  forEach(mergeWeekObject, calendarData);
  return mergedData;
}
// merge calendar data with api data
function mergeData(calendarData, apiData) {

  const mergedData = [];
  const generateWeeksObjects = ({ week_id, week_number, days_in_week }) => {
    const daysObjet = [];
    // find week data by week number
    const apiWeekData = apiData ? find(propEq('week_number', week_number))(apiData) : null;
    const generateDaysObjects = (day_number) => {
      // find day data by day number
      const apiDayData = apiWeekData && apiWeekData.days_in_week ? find(propEq('day_number', day_number))(apiWeekData.days_in_week) : null;

      const dayObject = {
        day_number,
        id: `${week_number}${day_number}`,
      };
      if (apiDayData) {
        dayObject.minutes = apiDayData.minutes;
        dayObject.hours = apiDayData.hours;
      }
      daysObjet.push(dayObject);
    };

    forEach(generateDaysObjects, days_in_week);
    const weekObject = {
      week_id,
      week_number,
      days_in_week: daysObjet
    };
    if (apiWeekData) {
      weekObject.status = apiWeekData.status;
    }
      
    mergedData.push(weekObject);
  };
    
  forEach(generateWeeksObjects, calendarData);
  return mergedData;
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

  const renderWeek2 = (weekId, weekNumber, days) => {
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

  let calendarData = generateCalendar(selectedMonth, selectedYear);
  if (data && data.length > 0) {
    calendarData = mergeCalendar(calendarData, data);
  }
  console.log('calendarData', calendarData);
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
              {calendarData.map(({ week_id, days_in_week, status }) =>
                <tr key={week_id} className={status}>
                  {renderWeek(days_in_week)}
                </tr>
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

function renderWeek(days_in_week) {
  return days_in_week.map(({ id, day_number, hours, minutes }) =>
    <td key={id}>
      {day_number}
      <br />
      {!isNil(hours) && !isNil(minutes) &&
        <p>{`${hours}h:${minutes}min`}</p>
      }  
    </td>);
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
