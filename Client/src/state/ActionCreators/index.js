

// Action types
export const SET_ALERT = 'SET_ALERT';
export const SET_PRESENT_DAYS = 'SET_PRESENT_DAYS';
export const SET_ATTENDANCE_RESULT = 'SET_ATTENDANCE_RESULT';
export const SET_QUERIES = 'SET_QUERIES';
export const SET_SUBARR = 'SET_SUBARR';
export const SET_QUERIED_ATTENDANCE = 'SET_QUERIED_ATTENDANCE';
export const SET_ATTENDANCE_DATA = 'SET_ATTENDANCE_DATA';
export const SET_TEACHER_LOGGED_IN = 'SET_TEACHER_LOGGED_IN';
export const SET_DB_NAME = 'SET_DB_NAME';
export const SET_ROLL_NO = 'SET_ROLL_NO';
export const SET_COLLECTION_NAME = 'SET_COLLECTION_NAME';
export const SET_PAGE_NAME = 'SET_PAGE_NAME';

export const SET_MAKE_ALERT = 'SET_MAKE_ALERT'

// Action creators
// Action creators
export const makealert = (message, type) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { message, type }
  });

  setTimeout(() => {
    dispatch(clearAlert());
  }, 1500);
};
const clearAlert = () => ({
  type: SET_ALERT,
  payload: null
});

export const setpresentdays = (presentdays) => ({
  type: SET_PRESENT_DAYS,
  payload: presentdays
});

export const setattendanceresult = (attendanceResult) => ({
  type: SET_ATTENDANCE_RESULT,
  payload: attendanceResult
});

export const setqueries = (queries) => ({
  type: SET_QUERIES,
  payload: queries
});

export const setsubarr = (subarr) => ({
  type: SET_SUBARR,
  payload: subarr
});

export const setqueriedattendance = (queriedAttendance) => ({
  type: SET_QUERIED_ATTENDANCE,
  payload: queriedAttendance
});

export const setattendancedata = (attendanceData) => ({
  type: SET_ATTENDANCE_DATA,
  payload: attendanceData
});

export const setteacherloggedin = (isLoggedIn) => ({
  type: SET_TEACHER_LOGGED_IN,
  payload: isLoggedIn
});

export const setdbname = (dbname) => ({
  type: SET_DB_NAME,
  payload: dbname
});

export const setrollno = (rollNo) => ({
  type: SET_ROLL_NO,
  payload: rollNo
});

export const setcollectionname = (collectionName) => ({
  type: SET_COLLECTION_NAME,
  payload: collectionName
});

export const setpagename = (pageName) => ({
  type: SET_PAGE_NAME,
  payload: pageName
});
