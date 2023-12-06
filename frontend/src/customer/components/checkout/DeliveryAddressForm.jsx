import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import AddressCard from "../address-card/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../state/order/Action";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../state/auth/Action";

const DeliveryAddressForm = () => {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const jwt=localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store);

  const handleSubmit = (e,address) => {
    e.preventDefault();
    
    if (address == null) {
      const data = new FormData(e.currentTarget);
  
      address = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        streetAddress: data.get("address"),
        city: data.get("city"),
        state: data.get("state"),
        pinCode: data.get("pincode"),
        mobile: data.get("phone"),
      };
    }
    
    console.log("address",address);

    const orderData={address,navigate}

    dispatch(createOrder(orderData))
    console.log(address);
  };

  useEffect(() => {
    if(jwt) {
      dispatch(getUser(jwt))
    }
  },[jwt,auth.jwt]);
  
  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={5}
          // className="border rounded-md shadow-md overflow-y-scroll h-[30.5rem]"
        >
          <Box className="border rounded-md shadow-md p-5 overflow-y-scroll h-[31rem]">
          {auth.user.addresses.map((item) => <div className="p-5 py-7 border-b cursor-pointer">
              {/* <AddressCard address={item}/>
              <Button
                sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                size="large"
                variant="contained"
                type="submit"
                onClick={(e) => handleSubmit(e, item)}
              >
                Deliver Here
              </Button> */}
              <div key={item.addressId} className="p-5 py-7 border-b cursor-pointer">
                <AddressCard address={item} />
                <Button
                  sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                  size="large"
                  variant="contained"
                  onClick={(e) => handleSubmit(e, item)}
                >
                  Deliver Here
                </Button>
              </div>
            </div>)}
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box className="border rounded-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="pincode"
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    autoComplete
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    autoComplete
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone No."
                    fullWidth
                    autoComplete
                  />
                </Grid>

                <Grid item xs={12} lg={6} className="flex items-center justify-center">
                  <Button
                    sx={{ py: 1, px: 5, mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
