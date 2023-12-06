import { api } from "../../config/ApiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_BY_CATEGORY_FAILURE,
  FIND_BY_CATEGORY_REQUEST,
  FIND_BY_CATEGORY_SUCCESS,
  FIND_BY_ID_FAILURE,
  FIND_BY_ID_REQUEST,
  FIND_BY_ID_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_BY_CATEGORY_REQUEST });
  const {
    color,
    size,
    minPrice,
    maxPrice,
    minDiscount,
    topCategory,
    secondCategory,
    thirdCategory,
    stock,
    sort,
    pageNum,
    pageSize,
  } = reqData;

  try {
    const { data } = await api.get(
      `/api/products?color=${color}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&topCategory=${topCategory}&secondCategory=${secondCategory}&thirdCategory=${thirdCategory}&stock=${stock}&sort=${sort}&pageNum=${pageNum}&pageSize=${pageSize}`
    );

    dispatch({ type: FIND_BY_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_BY_CATEGORY_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_BY_ID_REQUEST });
  const productId = reqData;

  try {
    const { data } = await api.get(`/api/products/id/${productId}`);

    dispatch({ type: FIND_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });

  try {
    const { data } = await api.post(`/api/admin/products/`,product);
    console.log("Created Product",data);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });

  try {
    const { data } = await api.delete(`/api/admin/products/${productId}/delete`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};
