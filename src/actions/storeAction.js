import axios from 'axios';
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
export const getAllStores = () => async dispatch => {
  try {
    dispatch({type: GET_STORES_REQUEST});

    const {data} = await axios.get(`https://deals.subhdeals.com/api/store`);

    dispatch({type: GET_STORES_SUCCESS, payload: data.store});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_STORES_FAIL,
        payload: error.response.data
          ? error.response.data.message
          : error.response._response,
      });
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};

//get single store details
export const getStoreDetails = id => async dispatch => {
  try {
    dispatch({type: GET_STORE_DETAILS_REQUEST});

    const {data} = await axios.get(
      `https://deals.subhdeals.com/api/store/${id}`,
    );

    dispatch({type: GET_STORE_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_STORE_DETAILS_FAIL,
        payload: error.response.data
          ? error.response.data.message
          : error.response._response,
      });
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};

//clear errors
export const clearErrors = () => async dispatch => {
  try {
    dispatch({type: CLEAR_ERROR});
  } catch (error) {
    console.log('Error' + error);
  }
};
