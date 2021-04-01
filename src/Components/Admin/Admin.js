import React from 'react';
import { makeStyles } from "@material-ui/core/styles"

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

import GridOnIcon from '@material-ui/icons/GridOn';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddProduct from '../AddProduct/AddProduct';
import ManageProducts from '../ManageProducts/ManageProducts';

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

const Admin = () => {
    const classes = useStyles();
    return (
        <Router>
        <div style={{display:'flex'}}>
            <Drawer 
                style={{width: '300px'}}
                variant="persistent"
                anchor="left"
                open={true}
                classes={{paper: classes.drawerPaper}}
            >
                <h1 style={{textAlign:'center'}}>Admin</h1>
                <List>
                    <Link to='/admin' className={classes.link}>
                        <ListItem button>
                            <ListItemIcon >
                                <GridOnIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Manage Books"}/>
                        </ListItem>
                    </Link>
                    <Link to='/admin/addProduct' className={classes.link}>
                        <ListItem button>
                            <ListItemIcon >
                               <AddIcon></AddIcon>
                            </ListItemIcon>
                            <ListItemText primary={"Add Books"}/>
                        </ListItem>
                    </Link>
                    <Link to='/admin/editProduct' className={classes.link}>
                        <ListItem button>
                            <ListItemIcon >
                                <EditIcon></EditIcon>
                            </ListItemIcon>
                            <ListItemText primary={"Edit Books"}/>
                        </ListItem>
                    </Link>
                    
                </List>

            </Drawer>
            <Switch>
            <Route exact path="/admin/">
                <Container>
                <Typography style={{marginTop: '20px',textAlign: 'center'}} variant="h3" gutterBottom>
                    Manage Books
                </Typography>
                <ManageProducts/>

                
                </Container>
            </Route>
            <Route exact path="/admin/addProduct">
                <Container>
                <Typography  style={{marginTop: '20px',textAlign: 'center'}} variant="h3" gutterBottom>
                    Add Product
                </Typography>
                <AddProduct></AddProduct>
                </Container>
            </Route>
            <Route exact path="/admin/editProduct">
                <Container>
                <Typography  style={{marginTop: '20px',textAlign: 'center'}} variant="h3" gutterBottom>
                    Edit Book
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This section is under development...
                </Typography>
                </Container>
            </Route>
            </Switch>
        </div>
        </Router>
    );
};

export default Admin;