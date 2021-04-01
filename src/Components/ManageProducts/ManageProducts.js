import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {},
});

const ManageProducts = () => {
    const [products,setProducts]= useState([]);
    useEffect(()=>{
        fetch('https://afternoon-tor-79198.herokuapp.com/allProducts')
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
        })
    },[products])
    const handleDelete=(id)=>{
        fetch('https://afternoon-tor-79198.herokuapp.com/deleteProduct/'+id,{
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            alert("Product successfully deleted");
        })
    }
    return (
        <>
            <div style={{width: '90%',margin: 'auto'}}>
            
            <TableContainer style={{boxShadow: '5px 5px 20px lightgray'}} component={Paper}>
                <Table aria-label="simple table">
                <TableHead style={{backgroundColor: 'aliceblue'}}>
                    <TableRow>
                    <TableCell>Book-name</TableCell>
                    <TableCell align="right">Author</TableCell>
                    <TableCell align="right">Price&nbsp;</TableCell>
                    <TableCell align="right">Action&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((pd) => (
                    <TableRow key={pd._id}>
                        <TableCell component="th" scope="row">
                        {pd.productName}
                        </TableCell>
                        <TableCell align="right">{pd.writer}</TableCell>
                        <TableCell align="right">{pd.price}</TableCell>
                        <TableCell align="right">
                            <EditIcon style={{padding: '3px',backgroundColor:'#596f59',color: 'white',cursor: 'pointer',borderRadius: '5px'}}/> &nbsp;
                            <DeleteIcon onClick={()=>handleDelete(pd._id)} style={{padding: '3px',cursor: 'pointer',backgroundColor:'#b7b708',color: 'white',borderRadius: '5px'}}/>
                        </TableCell>
                        
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </div>
        </>
    );
};

export default ManageProducts;