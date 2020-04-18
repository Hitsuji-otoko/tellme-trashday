const {
  getMoment,
  getWeekOfMonth,
  Monday,
  Tuesday,
  WednesDay,
  Thursday,
  Saturday,
  Sunday,
} = require('./utils/date');

const info = {
  burnable: {
    message: '明日は 【燃えるゴミ】',
    days: [Monday, Thursday],
    weeks: [],
  },
  unburnable: {
    message: '明日は　【燃えないゴミ】',
    days: [Friday],
    weeks: [2, 4],
  },
  recycle: {
    message: '明日は　【資源ごみ ペットボトル,段ボール etc】',
    days: [Saturday],
    weeks: [],
  },
}

/* 今日がゴミ分別のどれに当たるか判定する処理 */

// 曜日が合っているか
const isDateDay = (date, days = []) => {
  return days.includes(date.day());
};

// 週が合っているか
const isWeekDay = (date, weeks = []) => {
  const weekOfMonth = getWeekOfMonth(date);
  // todo:think
  return weeks.length > 0 ? weeks.includes(weeksOfMonth) : true;
};

// ゴミ出しの日か
const isTrashDay = (date, obj) => {
  return isDateDay(date, obj.days) && isWeekDay(date, obj.weeks);
};

// ゴミ出しの日であれば、メッセージを返す
const getMessage = date => {
  let message = undefined;
  Object.keys(info).forEach(key => {
    const obj = info[key];
    if (isTrashDay(date, obj)) message = obj.message;
  });
  return message;
};

// LINE Messaging APIの実装
const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: process.env.ACCESS_TOKEN
});

/** メイン処理のhandlerを実装 */
exports.handler = async event => {
  // 明日がゴミ出しの日かどうか

  const tomorrow = getMoment().add(1, 'days');
  const message = getMessage(tomorrow);

  if (message) {
    const postMessage = {
      type: 'text',
      text: message,
    }
    try {
      await client.pushMessage(process.env.USER_ID, postMessage);
    } catch (error) {
      console.log(error);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(postMessage)
    };
  }

  return {
    statusCode: 200
  }
};