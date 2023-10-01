import {
  CLEAR_ERROR,
  GET_STORES_FAIL,
  GET_STORES_REQUEST,
  GET_STORES_SUCCESS,
  GET_STORE_DETAILS_FAIL,
  GET_STORE_DETAILS_REQUEST,
  GET_STORE_DETAILS_SUCCESS,
} from '../constants/storeConstants';

//get all stores
export const storeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STORES_REQUEST:
    case GET_STORE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: action.payload,
      };
    case GET_STORE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        storeDetails: action.payload.store,
        storeProducts: action.payload.data,
      };

    case GET_STORES_FAIL:
    case GET_STORE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
