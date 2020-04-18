const moment = require('moment-timezone');

moment.tz('Asia/Tokyo').locale('ja');

const Monday = 1;
const Tuesday = 2;
const Wednesday = 3;
const Thursday = 4;
const Friday = 5;
const Saturday = 6;
const Sunday = 7;

// 今日
function getMoment(date = new Date()) {
  return moment(date)
    .tz('Asia/Tokyo')
    .locale('ja');
}

// 何番目の週か
function getWeekOfMonth(date) {
  // todo:think
  return Math.ceil(date.date() / 7);
}

module.exports = {
  Monday: Monday,
  Tuesday: Tuesday,
  Wednesday: Wednesday,
  Thursday: Thursday,
  Friday: Friday,
  Saturday: Saturday,
  Sunday: Sanday,
  getMoment: getMoment,
  getWeekOfMonth: getWeekOfMonth,
};