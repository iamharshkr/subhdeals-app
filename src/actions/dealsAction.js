import axios from 'axios';
import {
  GET_DEALS_REQUEST,
  GET_DEALS_SUCCESS,
  GET_DEALS_FAIL,
  CLEAR_ERROR,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_POPULAR_DEALS_REQUEST,
  GET_POPULAR_DEALS_SUCCESS,
  GET_POPULAR_DEALS_FAIL,
  GET_MORE_DEALS_REQUEST,
  GET_MORE_DEALS_SUCCESS,
  GET_MORE_DEALS_FAIL,
  SEARCH_DEALS_REQUEST,
  SEARCH_DEALS_SUCCESS,
  SEARCH_DEALS_FAIL,
} from '../constants/dealsConstants';

// get deals
export const getDeals = link => async dispatch => {
  try {
    dispatch({type: GET_DEALS_REQUEST});

    const url = link ? link : 'https://deals.subhdeals.com/api/getdeals';

    const {data} = await axios.get(url);

    dispatch({type: GET_DEALS_SUCCESS, payload: data.data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_DEALS_FAIL,
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

//get more deals
export const getMoreDeals = link => async dispatch => {
  try {
    dispatch({type: GET_MORE_DEALS_REQUEST});
    const {data} = await axios.get(link);

    dispatch({type: GET_MORE_DEALS_SUCCESS, payload: data.data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_MORE_DEALS_FAIL,
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

// get popular deals
export const getPopularDeals = link => async dispatch => {
  try {
    dispatch({type: GET_POPULAR_DEALS_REQUEST});

    const url = link
      ? link
      : 'https://deals.subhdeals.com/api/getdeals?postfilter=mostviewed';

    const {data} = await axios.get(url);

    dispatch({type: GET_POPULAR_DEALS_SUCCESS, payload: data.data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_POPULAR_DEALS_FAIL,
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

export const searchDeals = query => async dispatch => {
  try {
    dispatch({type: SEARCH_DEALS_REQUEST});

    const {data} = await axios.get(
      `https://deals.subhdeals.com/api/getdeals?s=${query}`,
    );

    dispatch({type: SEARCH_DEALS_SUCCESS, payload: data.data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SEARCH_DEALS_FAIL,
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

// get product details
export const getProductDetails = id => async dispatch => {
  try {
    dispatch({type: GET_PRODUCT_DETAILS_REQUEST});

    const {data} = await axios.get(
      `https://deals.subhdeals.com/api/getdeals?p=${id}`,
    );

    dispatch({type: GET_PRODUCT_DETAILS_SUCCESS, payload: data.data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_PRODUCT_DETAILS_FAIL,
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
