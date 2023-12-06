import React, { useEffect } from "react";
import AddressCard from "../address-card/AddressCard";
import { Button } from "@mui/material";
import CartItem from "../cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../state/order/Action";
import { useLocation, useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";
import { createPayment } from "../../../state/payment/Action";

const OrderSummary = () => {

  const dispatch=useDispatch();
  const location=useLocation();
  const searchParams=new URLSearchParams(location.search);
  const orderId=searchParams.get("order_id");
  const {order}=useSelector(store=>store)
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(getOrderById(orderId))
  },[orderId])

  const handleCheckout = () => {
    // dispatch(createPayment(orderId));
    navigate(`/payment/${orderId}`);
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard address={order.order?.shippingAddress} />
      </div>

      <div className="lg:grid grid-cols-3 relative">
        <div className="col-span-2">
          {order.orders?.map((item) => (
            <OrderItem item={item} />
          ))}
        </div>

        <div className="px-5 sticky top-0 h-[100vh] mt-10 lg:mt-5">
          <div className="border rounded-md p-5">
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <hr />

            <div className="space-y-3 font-semibold mb-10">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>₹{order.order?.totalPrice}</span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span>Discount</span>
                <span className="text-green-600">₹{order.order?.discount}</span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span>Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between pt-3 text-black font-bold">
                <span>Total Amount</span>
                <span>₹{order.order?.totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              variant="contained"
              className="w-full mt-5"
              sx={{ py: "0.7rem", bgcolor: "#9155fd" }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
