export const getDefaultTimes = () => {
  const startTime = "8:00";
  const endTime = "22:00";
  const times = [
    {
      time: "0:00",
      available: false,
    },
    {
      time: "1:00",
      available: false,
    },
    {
      time: "2:00",
      available: false,
    },
    {
      time: "3:00",
      available: false,
    },
    {
      time: "4:00",
      available: false,
    },
    {
      time: "5:00",
      available: false,
    },
    {
      time: "6:00",
      available: false,
    },
    {
      time: "7:00",
      available: false,
    },
    {
      time: "8:00",
      available: false,
    },
    {
      time: "9:00",
      available: false,
    },
    {
      time: "10:00",
      available: false,
    },
    {
      time: "11:00",
      available: false,
    },
    {
      time: "12:00",
      available: false,
    },
    {
      time: "13:00",
      available: false,
    },
    {
      time: "14:00",
      available: false,
    },
    {
      time: "15:00",
      available: false,
    },
    {
      time: "16:00",
      available: false,
    },
    {
      time: "17:00",
      available: false,
    },
    {
      time: "18:00",
      available: false,
    },
    {
      time: "19:00",
      available: false,
    },
    {
      time: "20:00",
      available: false,
    },
    {
      time: "21:00",
      available: false,
    },
    {
      time: "22:00",
      available: false,
    },
  ];
  let include = false;
  return times.filter((time) => {
    if (time.time === startTime) {
      include = true;
    }
    if (time.time === endTime) {
      include = false;
      return true;
    }
    return include;
  });
};
