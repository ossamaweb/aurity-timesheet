// @flow
import { range, slice, propEq, find, merge, forEach } from 'ramda';
import { getDaysPerMonth } from '../constants';

const DAYS_IN_WEEK = 7;

const getWeekNumber = (date: Date): number => {
  const d = date;
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() +4 - (d.getDay() || 7));
  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

const isToday = (day_number: number, month: number, year: number): boolean => {
  const todayDate = new Date();
  return (todayDate.getMonth() === month - 1)
    && (todayDate.getFullYear() === year)
    && (todayDate.getDate() === day_number);
};


const generateDaysObjects = (
  pos: string,
  from: number,
  to: number,
  month: number,
  year: number
): Array<Object> => {
  const days = [];
  const arr = range(from, to);
  for (let day_number of arr) {
    days.push(
      {
        day_number,
        hours: null,
        minutes: null,
        key: `${month}${day_number}`,
        id: `${month}${day_number}`,
        is_odd: pos === 'prev' || pos === 'next' ? true : false,
        is_today: isToday(day_number, month, year)
      }
    );
  }
  return days;
}

const generateDates = (
  selectedMonth: number,
  selectedYear: number,
  numOfWeeks: number,
  daysPerMonth: Array<number>
): Array<Object> => {
  
  const previousMonthNumber = selectedMonth === 1 ? 12 : selectedMonth - 1;
  const nextMonthNumber = selectedMonth === 12 ? 1 : selectedMonth + 1;

  const numOfDaysInCurrentMonth = daysPerMonth[selectedMonth-1];
  const numOfDaysInPrevMonth = daysPerMonth[previousMonthNumber - 1];

  const firstDayOfMonth = new Date(`${selectedMonth} 1, ${selectedYear}`);
  const firstDayOfTheWeek = firstDayOfMonth.getDay() === 0 ? DAYS_IN_WEEK : firstDayOfMonth.getDay(); // Sunday is 7, Monday is 1

  // number of days of previous month that are visibile in selected month
  const numOfPrevVisibleDays = firstDayOfTheWeek - 1;

  const dates = [];

  // insert visible previous months days
  dates.push(
    ...generateDaysObjects(
      'prev',
      (numOfDaysInPrevMonth + 1) - numOfPrevVisibleDays,
      numOfDaysInPrevMonth + 1,
      previousMonthNumber,
      selectedYear)
  );

  // insert selected months days
  dates.push(
    ...generateDaysObjects(
      'current',
      1,
      numOfDaysInCurrentMonth + 1,
      selectedMonth,
      selectedYear)
  );

  // number of days of next month that are visibile in selected month
  const numOfNextVisibleDays = (numOfWeeks * DAYS_IN_WEEK) - dates.length;

  // insert visible next months days
  dates.push(
    ...generateDaysObjects(
      'next',
      1,
      numOfNextVisibleDays + 1,
      nextMonthNumber,
      selectedYear)
  );
  return dates;
}

/**
  merge days in api with days in calendar
**/
const mergeDays = (weekDays: Array<Object>, apiWeekDays: Array<Object>) => {
  const mergedDays = [];
  const mergeDayObject = (day) => {
    const apiDay = find(propEq('day_number', day.day_number))(apiWeekDays);
    if (apiDay) {
      mergedDays.push(merge(day, apiDay));
    } else {
      mergedDays.push(day);
    }

  };
  forEach(mergeDayObject, weekDays);
  return mergedDays;
}

const generateWeeks = (
  firstWeekNumber: number,
  lastWeekNumber: number,
  numOfWeeks: number,
  dates: Array<Object>
): Array<Object> => {

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
  return weeks;
}

export const generateCalendar = (
  selectedMonth: number,
  selectedYear: number,
  apiWeeks: Array<Object>
): Array<Object> => {

  const daysPerMonth = getDaysPerMonth(selectedYear);
  // number of first week in selectedMonth
  const firstWeekNumber = getWeekNumber(new Date(selectedYear, selectedMonth - 1, 1));
  // number of last week in selectedMonth
  const lastWeekNumber = getWeekNumber(new Date(selectedYear, selectedMonth - 1, daysPerMonth[selectedMonth - 1]));
  // total weeks in selectedMonth
  const numOfWeeks = firstWeekNumber >= 52 ? lastWeekNumber + 1 : (lastWeekNumber - firstWeekNumber) + 1;

  const calendarDates = generateDates(selectedMonth, selectedYear, numOfWeeks, daysPerMonth);
  const calendarWeeks = generateWeeks(firstWeekNumber, lastWeekNumber, numOfWeeks, calendarDates);

  let calendar = [];
  const mergeWeekObject = (week) => {
    const apiWeek: ?Object | ?any = find(propEq('week_number', week.week_number))(apiWeeks);
    if (apiWeek) {
      const mergedDays =  mergeDays(week.days_in_week, apiWeek.days_in_week);
      apiWeek.days_in_week = mergedDays;
      apiWeek.data_exist = true;
      calendar.push(merge(week, apiWeek));
    } else {
      calendar.push(week);
    }

  };
  forEach(mergeWeekObject, calendarWeeks);
  return calendar;
}
