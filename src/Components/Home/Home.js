import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const Home = () => {
    const [products,setProducts]= useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/allProducts')
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
        })
    },[])
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            
            {
                products.map(pd=> <ProductCard product={pd}></ProductCard> )
            }
        </Grid>
    );
};

export default Home;