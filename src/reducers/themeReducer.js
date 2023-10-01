import {THEME_SUCCESS} from '../constants/themeConstants';

export const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case THEME_SUCCESS:
      return {
        darkMode: action.payload,
      };

    default:
      return state;
  }
};
