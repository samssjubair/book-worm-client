import { Box, CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Home.css'
const Home = () => {
    const [products,setProducts]= useState([]);
    useEffect(()=>{
        fetch('https://afternoon-tor-79198.herokuapp.com/allProducts')
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
                    products.length==0 && 
                    <div class="loading">
                        <div class="loader">
                            <CircularProgress  />
                            
                        </div>
                        
                    </div>
                }
                {
                    products.map(pd=> <ProductCard product={pd}></ProductCard> )
                }
            </Grid>
        </Box>
    );
};

export default Home;