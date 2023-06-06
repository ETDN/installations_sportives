import moment from "moment";

export const useMonths = (year) => ({
  1: {
    lastDay: 31,
    month: "January",
    firstDay: moment(`01/01/${year}`),
  },
  2: {
    lastDay: year % 4 === 0 ? 29 : 28,
    month: "February",
    firstDay: moment(`02/01/${year}`),
  },
  3: {
    lastDay: 31,
    month: "March",
    firstDay: moment(`03/01/${year}`),
  },
  4: {
    lastDay: 30,
    month: "April",
    firstDay: moment(`04/01/${year}`),
  },
  5: {
    lastDay: 31,
    month: "May",
    firstDay: moment(`05/01/${year}`),
  },
  6: {
    lastDay: 30,
    month: "June",
    firstDay: moment(`06/01/${year}`),
  },
  7: {
    lastDay: 31,
    month: "July",
    firstDay: moment(`07/01/${year}`),
  },
  8: {
    lastDay: 31,
    month: "August",
    firstDay: moment(`08/01/${year}`),
  },
  9: {
    lastDay: 30,
    month: "September",
    firstDay: moment(`09/01/${year}`),
  },
  10: {
    lastDay: 31,
    month: "October",
    firstDay: moment(`10/01/${year}`),
  },
  11: {
    lastDay: 30,
    month: "November",
    firstDay: moment(`11/01/${year}`),
  },
  12: {
    lastDay: 31,
    month: "December",
    firstDay: moment(`12/01/${year}`),
  },
});
