import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';


const Header = () => {
    const linkStyle={
        textDecoration: 'none',
        color: 'black'
   }
   const [loggedInUser,setLoggedInUser]= useContext(UserContext);
    return (
        <div>
             
            <ul>
                <h2>Book-worm</h2>
                <li  className="ms-auto"> <Link style={linkStyle} to="/home">Home</Link> </li>
                <li> <Link style={linkStyle}  to="/orders">Orders</Link></li>
                <li> <Link style={linkStyle}  to="/admin">Admin</Link></li>
                <li> <Link style={linkStyle} to="/deal">Deal</Link></li>
                
                {
                loggedInUser.email?
                <> <Button style={{marginLeft: '10px',backgroundColor: 'black'}} onClick={()=>setLoggedInUser({})} variant="contained" color="secondary">
                Log Out
                </Button> </> :
                <Link style={linkStyle} to="/login">
                <Button style={{marginLeft: '10px'}} variant="contained" color="primary">
                Log In
                </Button>
                </Link>
                }
            </ul>
            
        </div>
    );
};

export default Header;