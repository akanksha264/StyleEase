import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { getCart, removeCartItem, updateCartItem } from "../../../state/cart/Action";

const CartItem = ({item}) => {

  const dispatch=useDispatch();

  const handleUpdateCartItem = async (value) => {
    const data = {
      data : {quantity : item.quantity+value},
      cartItemId : item?.id
    };
    await dispatch(updateCartItem(data));
    dispatch(getCart());
  }

  const handleRemoveCartIem = async () => {
    await dispatch(removeCartItem(item?.id));
    dispatch(getCart());
  }

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

          <div className="flex space-x-5 items-center text-gray-900 pt-4">
            <p className="font-semibold ">₹{item?.product?.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{item?.product?.price}</p>
            <p className="text-green-600 font-semibold">{item?.product?.discountPercent}% off</p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton sx={{color:'RGB(145 85 253)'}} onClick={()=>handleUpdateCartItem(-1)} disabled={item?.quantity<=1}>
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>

          <IconButton sx={{color:'RGB(145 85 253)'}}  onClick={()=>handleUpdateCartItem(1)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <IconButton color="error" onClick={handleRemoveCartIem}>
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
