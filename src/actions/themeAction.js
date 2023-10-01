import {THEME_SUCCESS} from '../constants/themeConstants';

export const setTheme = val => async dispatch => {
  try {
    console.log('DARK MODE : ' + val)
    dispatch({type: THEME_SUCCESS, payload: val});
  } catch (error) {
    console.log('Error: ' + error);
  }
};
