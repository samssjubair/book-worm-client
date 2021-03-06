import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableFooter } from '@material-ui/core';
import { UserContext } from '../../App';

const useStyles = makeStyles({
  table: {
    
  },
});

function createData(description, quantity, price) {
    return { description, quantity, price };
  }


const CheckOut = () => {
    const {id}=useParams();
    const history= useHistory();
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const classes = useStyles();
    const [product,setProduct]= useState({});
    useEffect(()=>{
        fetch('https://afternoon-tor-79198.herokuapp.com/product/'+id)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[])
    const rows = [
        createData(product.productName, 1, product.price)
      ];

      const handleCheckOut=()=>{
          const {email,displayName}= loggedInUser;
          const {productName,writer,price}=product;
          const orderInfo={email,displayName,productName,writer,price,orderDate: new Date()};
          fetch('https://afternoon-tor-79198.herokuapp.com/placeOrder',{
              method: 'POST',
              headers: {"Content-type": 'application/json'},
              body: JSON.stringify(orderInfo)
          })
          .then(res=>res.json())
          .then(data=> {
              if(data){
                  alert("Order placed successfully.");
                  history.push('/');
              }
          } )
      }
    
    
    
    
    return (
        <div style={{position: 'relative',width: '70%',margin: 'auto'}}>
            <h1>Checkout</h1>
            <TableContainer style={{boxShadow: '5px 5px 10px grey'}} component={Paper}>
            
                <Table className={classes.table} aria-label="simple table">
                
                    <TableHead >
                    <TableRow>
                        <TableCell>Description </TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price&nbsp;($)</TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.description}
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableBody style={{backgroundColor: '#f7eaea'}}>
                        <TableCell component="th" scope="row">
                            Total
                        </TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell align="right"><strong>{product.price}</strong></TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button style={{position:'absolute',right:'0', marginTop: '20px',borderRadius: '10px'}} variant="contained" color="secondary" onClick={handleCheckOut}>
                Checkout
            </Button>
            
        </div>
    );
};

export default CheckOut;