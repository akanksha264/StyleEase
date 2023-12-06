import {
  CANCELLED_ORDER_FAILURE,
  CANCELLED_ORDER_REQUEST,
  CANCELLED_ORDER_SUCCESS,
  CONFIRMED_ORDER_FAILURE,
  CONFIRMED_ORDER_REQUEST,
  CONFIRMED_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  SHIPPED_ORDER_FAILURE,
  SHIPPED_ORDER_REQUEST,
  SHIPPED_ORDER_SUCCESS,
} from "./ActionType";

const initialState = {
    orders: [],
    order: null,
    error: null,
    loading: false,
  };
  

export const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
    case CONFIRMED_ORDER_REQUEST:
    case DELIVERED_ORDER_REQUEST:
    case CANCELLED_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
    case SHIPPED_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload, error: null, updated:false };

    case CONFIRMED_ORDER_SUCCESS:
    case CANCELLED_ORDER_SUCCESS:
    case DELIVERED_ORDER_SUCCESS:
    case SHIPPED_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: null, updated: true };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order.id !== action.payload),
        updated: true,
      };

    case GET_ORDERS_FAILURE:
    case CONFIRMED_ORDER_FAILURE:
    case DELIVERED_ORDER_FAILURE:
    case CANCELLED_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
    case SHIPPED_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
        return state;
  }
};
