import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { getCart, removeCartItem, updateCartItem } from "../../../state/cart/Action";

const OrderItem = ({item}) => {
  return (
    <div className="p-5 shadow-lg border rounded-md mt-5">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product?.imageUrl}
            alt={item?.product?.title}
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70">Size:{item?.size}, {item?.color}</p>
          <p className="opacity-70">Seller: {item?.product?.brand}</p>
          <p className="opacity-70">Quantity: {item?.quantity}</p>

          <div className="flex space-x-5 items-center text-gray-900 pt-4">
            <p className="font-semibold ">₹{item?.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{item?.price}</p>
            <p className="text-green-600 font-semibold">{item?.product?.discountPercent}% off</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
