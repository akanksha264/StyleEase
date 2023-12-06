import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelledOrder,
  confirmedOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shippedOrder,
} from "../../state/admin/order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddressCard from "../../customer/components/address-card/AddressCard";

const OrderTable = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState({});
  const [open, setOpen] = useState({});

  const handleMenuOpen = (event, orderId) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [orderId]: event.currentTarget,
    }));
    setOpen((prevOpen) => ({
      ...prevOpen,
      [orderId]: true,
    }));
  };

  const handleMenuClose = (orderId) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [orderId]: null,
    }));
    setOpen((prevOpen) => ({
      ...prevOpen,
      [orderId]: false,
    }));
  };

  const handleShippedOrder = (orderId) => {
    dispatch(shippedOrder(orderId));
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmedOrder(orderId));
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
  };

  const handleCancelledOrder = (orderId) => {
    dispatch(cancelledOrder(orderId));
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [adminOrder.updated]);

  return (
    <div>
      <Card className="mt-2">
        <CardHeader title="Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Shipping Address</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders?.map((order) => (
                <TableRow
                  key={order.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {order.orderItems?.map((item) => (
                        <Avatar src={item.product?.imageUrl} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="left" component="th" scope="order">
                    {order.orderItems?.map((item) => (
                      <p>{item.product?.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {order.totalDiscountedPrice}
                  </TableCell>
                  <TableCell align="left">
                    <AddressCard address={order.shippingAddress} />
                  </TableCell>
                  <TableCell align="center">
                    <div key={order.id}>
                      <Button
                        id={`basic-button-${order.id}`} 
                        aria-controls={open[order.id] ? `basic-menu-${order.id}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open[order.id] ? "true" : undefined}
                        onClick={(e) => handleMenuOpen(e, order.id)}
                      >
                        {order.orderStatus}
                      </Button>
                      <Menu
                        id={`basic-menu-${order.id}`}
                        anchorEl={anchorEl[order.id]}
                        open={open[order.id]}
                        onClose={() => handleMenuClose(order.id)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${order.id}`,
                        }}
                      >
                        <MenuItem
                          onClick={() => handleConfirmedOrder(order.id)}
                        >
                          Confirmed
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDeliveredOrder(order.id)}
                        >
                          Delivered
                        </MenuItem>
                        <MenuItem onClick={() => handleShippedOrder(order.id)}>
                          Shipped
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleCancelledOrder(order.id)}
                        >
                          Cancelled
                        </MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Button color="error" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTable;
