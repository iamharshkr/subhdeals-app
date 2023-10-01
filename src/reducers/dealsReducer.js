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

export const dealsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEALS_REQUEST:
    case GET_POPULAR_DEALS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_DEALS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        nextPage: action.payload.next_page_url,
      };

    case GET_POPULAR_DEALS_SUCCESS:
      return {
        ...state,
        loading: false,
        popularDeals: action.payload,
        nextPage: action.payload.next_page_url,
      };

    case GET_DEALS_FAIL:
    case GET_POPULAR_DEALS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payloads,
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

//get product details
export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };

    case GET_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payloads,
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

//get more details
export const getMoreDealsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MORE_DEALS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_MORE_DEALS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        nextPage: action.payload.next_page_url,
      };

    case GET_MORE_DEALS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payloads,
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

//search reducer
export const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_DEALS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_DEALS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };

    case SEARCH_DEALS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payloads,
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
