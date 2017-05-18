import { range, slice, find, propEq, forEach } from 'ramda';
import { getDaysPerMonth } from '../constants';

const DAYS_IN_WEEK = 7;

function getWeekNumber(date) {
  const d = date;
  d.setHours(0,0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

/**
  generate calendar weeks array similar to api data weeks
**/
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
      days_in_week: daysObjet,
      data_exist: false,
    };      
    weeks.push(weekObject);
  };
    
  forEach(generateWeeksObjects, data);
  return weeks;
}

/**
  merge days in api with days in calendar
**/
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

/**
  generate calendar dates
**/
export function generateCalendar(selectedMonth, selectedYear) {
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
  const prevMonthDays = range((numOfDaysInPrevMonth + 1) - numOfPrevMonthDays, numOfDaysInPrevMonth + 1);
  dates.push(...prevMonthDays);
  // insert current months days
  const currentMonthDays = range(1, numOfDaysInCurrentMonth + 1);
  dates.push(...currentMonthDays);
  // number of first week in selectedMonth
  const firstWeekNumber = getWeekNumber(new Date(selectedYear, selectedMonth - 1, 1));
  // number of last week in selectedMonth
  const lastWeekNumber = getWeekNumber(new Date(selectedYear, selectedMonth - 1, daysPerMonth[selectedMonth - 1]));
  // total weeks in selectedMonth
  const numOfWeeks = firstWeekNumber >= 52 ? lastWeekNumber + 1 : (lastWeekNumber - firstWeekNumber) + 1;
  // generate a weeks object that contain dates.
  const weeks = [];
  let weekNumber = firstWeekNumber;
  for (let index = 0; index < numOfWeeks; index += 1) {
    // slice dates to weeks
    const weekDays = slice(index * DAYS_IN_WEEK,(index + 1) * DAYS_IN_WEEK, dates);

    weeks.push(
      {
        week_number: weekNumber + index,
        week_id: index,
        days_in_week: weekDays
      }
    );
    if (weekNumber >= 52) {
      weekNumber = 0;
    }
  }
  // rows left at the end
  const numOfNextMonthDays = 7 - weeks[numOfWeeks-1].days_in_week.length;
  if (numOfNextMonthDays > 0) {
    // insert next month dates
    weeks[numOfWeeks-1].days_in_week.push(...range(1, numOfNextMonthDays +1));
  }

  return generateWeeksObjects(weeks);
}

/**
  merge calendar weeks with api weeks
**/
export function mergeCalendar(calendarData, apiData) {
  let mergedData = [];
  const mergeWeekObject = (week) => {
    const apiWeek = find(propEq('week_number', week.week_number))(apiData);
    if (apiWeek) {
      const mergedDays =  mergeDays(week.days_in_week, apiWeek.days_in_week);
      apiWeek.days_in_week = mergedDays;
      apiWeek.data_exist = true;
      mergedData.push(apiWeek);
    } else {
      mergedData.push(week);
    }

  };
  forEach(mergeWeekObject, calendarData);
  return mergedData;
}