export const months = [
  {
    id: 1,
    name: 'January',
    number: 1
  },
  {
    id: 2,
    name: 'February',
    number: 2
  },
  {
    id: 3,
    name: 'March',
    number: 3
  },
  {
    id: 4,
    name: 'April',
    number: 4
  },
  {
    id: 5,
    name: 'May',
    number: 5
  },
  {
    id: 6,
    name: 'June',
    number: 6
  },
  {
    id: 7,
    name: 'July',
    number: 7
  },
  {
    id: 8,
    name: 'August',
    number: 8
  },
  {
    id: 9,
    name: 'September',
    number: 9
  },
  {
    id: 10,
    name: 'October',
    number: 10
  },
  {
    id: 11,
    name: 'November',
    number: 11
  },
  {
    id: 12,
    name: 'December',
    number: 12
  },
];
export const days = [
  {
    id: 1,
    name: 'Monday',
    short_name: 'Mon',
    number: 1
  },
  {
    id: 2,
    name: 'Tuesday',
    short_name: 'Tue',
    number: 2
  },
  {
    id: 3,
    name: 'Wednesday',
    short_name: 'Wen',
    number: 3
  },
  {
    id: 4,
    name: 'Thursday',
    short_name: 'Thu',
    number: 4
  },
  {
    id: 5,
    name: 'Friday',
    short_name: 'Fri',
    number: 5
  },
  {
    id: 6,
    name: 'Saturday',
    short_name: 'Sat',
    number: 6
  },
  {
    id: 7,
    name: 'Sunday',
    short_name: 'Sun',
    number: 7
  }
];

// Determing if February (28,or 29)  
const FebNumberOfDays = (year) => 
  (year % 4 === 0 && year % 100) || year % 400 === 0 ? 29 : 28;


export const getDaysPerMonth = (year) =>
  [31, FebNumberOfDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
