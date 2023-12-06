import { api } from "../../../config/ApiConfig";
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

export const getOrders = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const response = await api.get(`/api/admin/orders/`);
    console.log("Orders ", response.data);
    dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error", error);
    dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
  }
};

export const confirmedOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRMED_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    console.log("Order ", data);
    dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error", error);
    dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
  }
};

export const shippedOrder = (orderId) => async (dispatch) => {
  dispatch({ type: SHIPPED_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/shipped`);
    console.log("Order ", data);
    dispatch({ type: SHIPPED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error", error);
    dispatch({ type: SHIPPED_ORDER_FAILURE, payload: error.message });
  }
};

export const deliveredOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVERED_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/delivered`);
    console.log("Order ", data);
    dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error", error);
    dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
  }
};

export const cancelledOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCELLED_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/cancelled`);
    console.log("Order ", data);
    dispatch({ type: CANCELLED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error", error);
    dispatch({ type: CANCELLED_ORDER_FAILURE, payload: error.message });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/delete`);
    console.log("Order deleted", response);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    console.log("Error", error);
    dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
  }
};
