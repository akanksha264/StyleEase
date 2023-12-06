import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../state/order/Action';
import { updatePayment } from '../../../state/payment/Action';
import { Alert, AlertTitle, Grid } from '@mui/material';
import OrderTracker from '../orders/OrderTracker';
import { OrderList } from '../orders/OrderList';

const PaymentSuccess = () => {

    const [paymentId,setPaymentId]=useState();
    const [referenceId,setReferenceId]=useState();
    const [paymentStatus,setPaymentStatus]=useState();

    const {orderId}=useParams();
    const dispatch=useDispatch();
    const {order}=useSelector(store=>store);

    useEffect(() => {
        
        const urlParams=new URLSearchParams(window.location.search);

        setPaymentId(urlParams.get("razorpay_payment_link_id"));
        setPaymentStatus(urlParams.get("razorpay_payment_link_status"));

    },[])

    useEffect(() => {
        const fetchData = async () => {
          const data = { orderId, paymentId };
          await dispatch(updatePayment(data));
          dispatch(getOrderById(orderId));
        };
    
        fetchData(); // Call the async function inside the useEffect
    
      }, [orderId, paymentId, dispatch]);

  return (
    <div className='px-2 lg:px-36'>
        <div className='flex flex-col justify-center items-center'>
            <Alert
            variant='filled'
            severity='success'
            sx={{mb:6,width:"fit-content"}}
            >
                <AlertTitle>Payment Success!</AlertTitle>
                Your order has been placed.
            </Alert>
        </div>

        <OrderTracker activeStep={0}/>

        <div className='pt-10 mt-15'>
            <OrderList order={order.order} showRating={false}/>
        </div>
        
    </div>
  )
}

export default PaymentSuccess