import React, { useContext, useRef, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";
import { Avatar, Button, Checkbox } from '@material-ui/core';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useHistory, useLocation } from 'react-router-dom';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }


const Login = () => {
    const [loggedInUser,setLoggedInUser]= useContext(UserContext);
    
    const [newUser,setNewUser]=useState(false);
    const [loginError,setLoginError]=useState('');
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
    const { register, handleSubmit: handleLoginSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data => {
        const {userName,email,password} =data;
        if(newUser){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateUserName(userName);
                const {displayName,email}=user;
                
                const nUser={
                    displayName: userName,
                    email: email
                }
                setLoginError('');
                setLoggedInUser(nUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoginError(errorMessage);
            });
        }
        else{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                setLoginError('');
                setLoggedInUser(user);
                console.log(loggedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoginError(errorMessage);
            });
        }
        
    };
    const updateUserName=(userName)=>{
        var user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: userName
        }).then(function() {
        // Update successful.
        }).catch(function(error) {
        // An error happened.
        });
    }


    
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn=()=>{
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            setLoginError('');
            setLoggedInUser(user);
            history.replace(from);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            setLoginError(errorMessage);
        });
    }
    
    return  (
        <div className="form-style">
            {
                newUser? <h1>Register</h1>: <h1>Login</h1>
            }
            <form onSubmit={handleLoginSubmit(onSubmit)}>
                {
                    newUser && 
                    <><input name="userName" placeholder="Your full name" ref={register({required: true})} /> <br/>
                    {errors.userName && <span>User Name is required</span>} <br/> </>
                }
                <input name="email" placeholder="Email" ref={register({required: true,pattern: /\S+@\S+\.\S+/})} /> <br/>
                {errors.email && <span>Enter your email correctly</span>} <br/>
                <input type="password" name="password" placeholder="Password" ref={register({
                required: "You must specify a password",
                minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters including at least 1 digit"
                }
                })} /> <br/>
                {errors.password && <p>{errors.password.message}</p>} <br/>
                {
                    newUser &&
                    <>
                        <input
                        placeholder="Confirm your password"
                        name="password_repeat"
                        type="password"
                        ref={register({
                        validate: value =>
                            value === password.current || "The passwords do not match"
                        })}
                        /> <br/>
                        {errors.password_repeat && <p>{errors.password_repeat.message}</p>} <br/>
                    
                    </>
                }
                {
                    newUser ||
                    <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between'}}>
                    <div>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /> Remember me</div>  <div style={{color: 'red'}}>Forgot password?</div>
                     </div> 
                }
                
                <br/>
     
                <Button
                        type="submit"
                        variant="contained"
                        color="primary">
                        {
                            newUser? 'Create your account' : 'Login'
                        }
                    </Button> 
                    
            </form> 
            
            <hr/>
            {
                newUser? <p>Already have an account? <span onClick={()=>setNewUser(!newUser)} style={{color: 'red',cursor: 'pointer'}}>Login now</span></p>:
                 <p>Don't have an account? <span onClick={()=>setNewUser(!newUser)} style={{color: 'red',cursor: 'pointer'}}>Sign Up now</span></p> 
                
            }
            <p>Or</p>
            
            <Button variant="outlined" color="secondary" onClick={handleGoogleSignIn}>
            
            <FontAwesomeIcon icon={faGoogle} />
             &nbsp;&nbsp; Sign in with google
            </Button>
            <br/>
            <p style={{color: 'red'}}>{loginError}</p>
            
        </div>
    );
};

export default Login;