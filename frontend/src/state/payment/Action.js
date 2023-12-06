import { api } from "../../config/ApiConfig";
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_REQUEST } from "./ActionType"


export const createPayment = (orderId) => async (dispatch) => {

    dispatch({type:CREATE_PAYMENT_REQUEST});

    try {

        const data=await api.post(`/api/payments/${orderId}`,{});

        if (data.data?.paymentLinkUrl) {
            window.location.href=data.data.paymentLinkUrl;
        }
        console.log(data);

        dispatch({type:CREATE_PAYMENT_SUCCESS})

    } catch (error) {
        dispatch({type:CREATE_PAYMENT_FAILURE,payload:error.message});
    }
}

export const updatePayment = (reqData) => async (dispatch) => {

    dispatch({type:UPDATE_PAYMENT_REQUEST});

    try {

        // const data=await api.get(`/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`);
        const data=await api.get(`/api/payments?order_id=${reqData.orderId}`);

        console.log("Update Payment ",data)

        dispatch({type:CREATE_PAYMENT_SUCCESS})

    } catch (error) {
        dispatch({type:CREATE_PAYMENT_FAILURE,payload:error.message});
    }
}