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
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
      width: 140
    },
  });
const ProductCard = (props) => {
    const classes = useStyles();
    const {productName,price,writer,image}= props.product;
    return (
        <Grid container item md={4} xs={12}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={image}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {productName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {writer}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="h2">
                    {price}
                </Typography>
                </CardContent>
            </CardActionArea>
            
            <Button variant="contained" color="primary">
                Buy Now
            </Button>

            </Card>
        </Grid>
    );
};

export default ProductCard;