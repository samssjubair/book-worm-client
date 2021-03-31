import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {},
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Orders = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/allOrders?email=${loggedInUser.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  return (
    <div style={{width: '75%',margin: 'auto'}}>
      <p>
        Welcome {loggedInUser.displayName}! <br />

      </p>
      <h2>Your previous order:</h2>
      <TableContainer style={{boxShadow: '5px 5px 20px lightgray'}} component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{backgroundColor: 'aliceblue'}}>
            <TableRow>
              <TableCell>Book-name</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Price&nbsp;</TableCell>
              <TableCell align="right">Order Date&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell component="th" scope="row">
                  {order.productName}
                </TableCell>
                <TableCell align="right">{order.writer}</TableCell>
                <TableCell align="right">{order.price}</TableCell>
                <TableCell align="right">{order.orderDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
