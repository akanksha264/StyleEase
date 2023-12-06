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
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../state/admin/users/Action';

const CustomerTable = () => {

  const {users}=useSelector(store=>store);
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  },[]);

  return (
    <div>
      <Card className="mt-2">
        <CardHeader title="Customers" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Mobile No.</TableCell>
                {/* <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.users?.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar src="" />
                  </TableCell>
                  <TableCell align="left" component="th" scope="user">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.mobile==null ? "" : user.mobile}</TableCell>
                  {/* <TableCell align="center">
                    <Button
                      color="info"
                      onClick={() => navigate(`/product/${user.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button color="error" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default CustomerTable