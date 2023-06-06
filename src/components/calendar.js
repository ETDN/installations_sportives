// import React, { useState } from "react";
// import moment from "moment";
// import {
//   IconButton,
//   Grid,
//   makeStyles,
//   Card,
//   Button,
//   CircularProgress,
//   Popover,
//   Typography,
//   ThemeProvider,
//   createTheme,
//   Badge,
// } from "@material-ui/core";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CheckCircle as CheckCircleIcon,
// } from "@material-ui/icons";
// import { getDefaultTimes } from "./times";
// import { useMonths } from "./pages/months";

// const CalendarTemplate = () => {
//   const theme = createTheme({
//     typography: {
//       fontFamily: "Roboto",
//       fontSize: 12,
//     },
//     palette: {
//       primary: {
//         main: "#DF1B1B",
//       },
//       secondary: {
//         main: "#47b2a2",
//       },
//       text: {
//         primary: "#222222",
//       },
//     },
//   });

//   const useStyles = makeStyles((theme) => ({
//     calendar: {
//       fontFamily: theme.typography.fontFamily,
//     },
//     calendarText: {
//       margin: 0,
//       width: 25,
//       height: 25,
//       textAlign: "center",
//     },
//     button: {
//       minWidth: 200,
//       margin: 10,
//       fontFamily: theme.typography.fontFamily,
//     },
//     buttonNoMargin: {
//       minWidth: 200,
//       fontFamily: theme.typography.fontFamily,
//     },
//     popover: {
//       pointerEvents: "none",
//       fontFamily: theme.typography.fontFamily,
//     },
//     paper: {
//       padding: theme.spacing(1),
//     },
//     timeSlots: {
//       marginTop: 20,
//     },
//     timeSlotButton: {
//       margin: 5,
//     },
//   }));

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popoverContent, setPopoverContent] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const classes = useStyles();
//   const today = moment();
//   const [quickAvailability, setQuickAvailability] = useState({});
//   const [activeDay, setActiveDay] = useState(null);
//   const [year, setYear] = useState(Number(today.format("YYYY")));
//   const [monthNumber, setMonthNumber] = useState(Number(today.format("M")));
//   const [settingMultiple, setSettingMultiple] = useState(false);
//   const months = useMonths(year);
//   const { firstDay, month, lastDay } = months[monthNumber];
//   let dayOfWeek = Number(moment(firstDay).format("d"));
//   const days = getDaysArray();
//   const [times, setTimes] = useState(getDefaultTimes());
//   const [saving, setSaving] = useState(false);
//   let week = 0;
//   let dayOfMonth = 1;
//   while (week < 6 && dayOfMonth <= lastDay) {
//     days[week][dayOfWeek] = dayOfMonth;
//     dayOfMonth++;
//     dayOfWeek++;
//     if (dayOfWeek === 7) {
//       week++;
//       dayOfWeek = 0;
//     }
//   }

//   const createArrowHandler = (delta) => () => {
//     let newMonth = monthNumber + delta;
//     if (newMonth > 12) {
//       setYear(year + 1);
//       newMonth = 1;
//     } else if (newMonth < 1) {
//       setYear(year - 1);
//       newMonth = 12;
//       setActiveDay(null);
//       setTimes(getDefaultTimes());
//       setMonthNumber(newMonth);
//     }

//     const createDayHandler = (day) => () => {
//       setActiveDay(day);
//       setShowPopup(false);
//     };

//     const handleTimeSlotClick = (slot) => {
//       const updatedTimes = [...times];
//       updatedTimes[activeDay - 1].selectedSlot = slot;
//       setTimes(updatedTimes);
//     };

//     const handleOpenPopover = (date) => (e) => {
//       const quickAvailabilityTimes = quickAvailability[date];
//       if (quickAvailabilityTimes && quickAvailabilityTimes.length > 0) {
//         setPopoverContent(
//           quickAvailabilityTimes.map((time) => <p key={time}>{time}</p>)
//         );
//         setAnchorEl(e.target);
//       }
//     };

//     const handleClosePopover = () => {
//       setAnchorEl(null);
//       setPopoverContent(null);
//     };

//     return (
//       <ThemeProvider theme={theme}>
//         <Grid
//           className={classes.calendar}
//           container
//           direction="column"
//           alignItems="center"
//         >
//           <Grid item>
//             <Grid
//               container
//               direction="row"
//               alignItems="center"
//               justify="center"
//             >
//               <Grid item>
//                 <IconButton
//                   disabled={
//                     year === Number(today.format("YYYY")) &&
//                     month === today.format("MMMM")
//                   }
//                   onClick={createArrowHandler(-1)}
//                 >
//                   <ArrowLeft />
//                 </IconButton>
//               </Grid>
//               <Grid item>
//                 <Card style={{ padding: 10, margin: 10 }} variant="outlined">
//                   <Grid container direction="column" alignItems="center">
//                     <h3>
//                       {month} {year}
//                     </h3>
//                     {days.map((week, i) => (
//                       <Grid key={i} item>
//                         <Grid container direction="row">
//                           {week.map((day, i) => (
//                             <Grid key={year + month + i} item>
//                               <IconButton
//                                 onClick={createDayHandler(day)}
//                                 color={
//                                   activeDay === day ? "primary" : "default"
//                                 }
//                                 disabled={
//                                   !day ||
//                                   (year === Number(today.format("YYYY")) &&
//                                     month === today.format("MMMM") &&
//                                     day < Number(today.format("D")))
//                                 }
//                               >
//                                 <Badge
//                                   color="secondary"
//                                   badgeContent={
//                                     times[day - 1]?.available &&
//                                     activeDay === day &&
//                                     !showPopup ? (
//                                       <CheckCircleIcon />
//                                     ) : null
//                                   }
//                                 >
//                                   {day}
//                                 </Badge>
//                               </IconButton>
//                             </Grid>
//                           ))}
//                         </Grid>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Card>
//               </Grid>
//               <Grid item>
//                 <IconButton onClick={createArrowHandler(1)}>
//                   <ArrowRight />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item>
//             {activeDay && (
//               <Grid container direction="column" alignItems="center">
//                 <Grid item xs={12} md={8}>
//                   {times[activeDay - 1]?.available && (
//                     <div className={classes.timeSlots}>
//                       {times[activeDay - 1]?.slots.map((slot, index) => (
//                         <Button
//                           key={index}
//                           className={classes.timeSlotButton}
//                           variant="contained"
//                           color="primary"
//                           onClick={() => handleTimeSlotClick(slot)}
//                         >
//                           {slot}
//                         </Button>
//                       ))}
//                     </div>
//                   )}
//                   {!times[activeDay - 1]?.available && (
//                     <Typography variant="subtitle1">
//                       No available time slots for this day.
//                     </Typography>
//                   )}
//                 </Grid>
//               </Grid>
//             )}
//           </Grid>
//           <Popover
//             open={Boolean(anchorEl)}
//             anchorEl={anchorEl}
//             onClose={handleClosePopover}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "center",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "center",
//             }}
//           >
//             <div className={classes.popover}>
//               <Typography variant="body2">{popoverContent}</Typography>
//             </div>
//           </Popover>
//         </Grid>
//       </ThemeProvider>
//     );
//   };
// };

// export default CalendarTemplate;
