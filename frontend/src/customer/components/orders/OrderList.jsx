import { Box, Grid } from "@mui/material";
import React from "react";
import { deepPurple } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import AddressCard from "../address-card/AddressCard";

export const OrderList = ({ order }, { showRating }) => {
  return (
    <div>
      <Grid className="space-y-5" container>
        {order?.orderItems?.map((item) => (
          <Grid
            item
            container
            className="rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.product?.imageUrl}
                  alt={item.product?.title}
                />

                <div className="space-y-2 ml-5">
                  <p className="font-semibold">{item.product?.title}</p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    <span>Color: {item.color}</span>
                    <span>Size: {item.size}</span>
                  </p>
                  <p className="opacity-60 text-sm">
                    Seller: {item.product?.brand}
                  </p>
                  <p>₹{item.discountedPrice}</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              {showRating == true ? (
                <Box sx={{ color: deepPurple[500] }} className="cursor-pointer">
                  <StarIcon
                    sx={{ fontSize: "2.5rem" }}
                    className="px-2 text-5xl"
                  />
                  <span>Rate & Review Product</span>
                </Box>
              ) : (
                <AddressCard address={order?.shippingAddress}/>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
