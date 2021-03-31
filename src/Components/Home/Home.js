import { Box, Grid } from '@material-ui/core';
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
        <Box width="75%" style={{margin: '50px auto'}}>
            <Grid
                alignItems="center"
                spacing="3"
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                {
                    products.map(pd=> <ProductCard product={pd}></ProductCard> )
                }
            </Grid>
        </Box>
    );
};

export default Home;