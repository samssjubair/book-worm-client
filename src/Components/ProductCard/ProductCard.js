import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
const useStyles = makeStyles({
    root: {
      width: 300
    },
    media: {
      height: 200,
      width: 140,
      margin: 'auto',
      marginTop: 10
    },
  });
const ProductCard = (props) => {
    const history=useHistory();
    const classes = useStyles();
    const {_id,productName,price,writer,image}= props.product;
    const handleBuyNow=(id)=>{
        
        history.push(`/checkout/${id}`);
    }
    return (
        <Grid  container item md={4} xs={12}>
            <Card style={{boxShadow: '5px 5px 20px grey'}} className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={image}
                />
                <CardContent>
                <h2 style={{height: '50px',textAlign: 'center'}}>
                {productName}
                </h2>
                    
                
                <Typography  variant="body2" color="textSecondary" component="p">
                    {writer}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h2>
                       ${price}
                    </h2>
                    <Button onClick={()=>handleBuyNow(_id)} style={{height: '40px'}} variant="contained" color="primary">
                        Buy Now
                    </Button>
                </div>
                
                </CardContent>
            </CardActionArea>
            
            

            </Card>
        </Grid>
    );
};

export default ProductCard;