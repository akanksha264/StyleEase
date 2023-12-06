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

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_BY_CATEGORY_REQUEST:
    case FIND_BY_ID_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product: action.payload };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedProduct:action.payload,
      };

    case FIND_BY_ID_FAILURE:
    case FIND_BY_CATEGORY_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
