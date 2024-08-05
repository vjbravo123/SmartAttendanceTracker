// reducers.js

import {
    SET_ALERT,
    SET_PRESENT_DAYS,
    SET_ATTENDANCE_RESULT,
    SET_QUERIES,
    SET_SUBARR,
    SET_QUERIED_ATTENDANCE,
    SET_ATTENDANCE_DATA,
    SET_TEACHER_LOGGED_IN,
    SET_DB_NAME,
    SET_ROLL_NO,
    SET_COLLECTION_NAME,
    SET_PAGE_NAME,
    SET_MAKE_ALERT,
  } from '../ActionCreators/index';
  
  const initialState = {
    alert: null,
    presentdays: 0,
    attendancce_result: [],
    queries: [],
    subarr: [],
    queried_attendance: [],
    attendance_data: {},
    teacherloggedin: false,
    dbname: '',
    roll_no: '',
    collectionname: '',
    pagename: 'Homepage',
    makeAlert: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALERT:
        return { ...state, alert: action.payload };
  
      case SET_PRESENT_DAYS:
        return { ...state, presentdays: action.payload };
  
      case SET_ATTENDANCE_RESULT:
        return { ...state, attendancce_result: action.payload };
  
      case SET_QUERIES:
        return { ...state, queries: action.payload };
  
      case SET_SUBARR:
        return { ...state, subarr: action.payload };
  
        case SET_QUERIED_ATTENDANCE:
          return {
            ...state,
            queried_attendance: [...action.payload] // Make a copy of action.payload if it's an array
          };
        
  
      case SET_ATTENDANCE_DATA:
        return { ...state, attendance_data: action.payload };
  
      case SET_TEACHER_LOGGED_IN:
        return { ...state, teacherloggedin: action.payload };
  
      case SET_DB_NAME:
        return { ...state, dbname: action.payload };
  
      case SET_ROLL_NO:
        return { ...state, roll_no: action.payload };
  
      case SET_COLLECTION_NAME:
        return { ...state, collectionname: action.payload };
  
      case SET_PAGE_NAME:
        return { ...state, pagename: action.payload };
  
      case SET_MAKE_ALERT:
        return { ...state, makeAlert: action.payload };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  