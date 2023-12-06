import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { deleteProduct, findProducts } from "../../state/product/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const navigate = useNavigate();
  console.log(products);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    const data = {
      topCategory: "",
      secondCategory: "",
      thirdCategory: "",
      color: [],
      size: [],
      minPrice: "",
      maxPrice: "",
      minDiscount: 0,
      sort: "",
      stock: "",
      pageNum: 1,
      pageSize: 10,
    };

    dispatch(findProducts(data));
  }, [products.deletedProduct]);

  return (
    <div>
      <Card className="mt-2">
        <CardHeader title="Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.products?.content?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar src={row.imageUrl} />
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="info"
                      onClick={() => navigate(`/product/${row.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button color="error" onClick={() => handleDelete(row.id)}>
                      Delete
                    </Button>
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

export default ProductTable;
