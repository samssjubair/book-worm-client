
import { createContext, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import AddProduct from "./Components/AddProduct/AddProduct";
import CheckOut from "./Components/CheckOut/CheckOut";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Orders from "./Components/Orders/Orders";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext=createContext();

function App() {
  const [loggedInUser,setLoggedInUser]= useState({});
  return (
    <div >
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
        <Header></Header>
        
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/checkout/:id">
              <CheckOut></CheckOut>
            </Route>
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
            <PrivateRoute path="/admin/addProduct">
              <AddProduct></AddProduct>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        
      </Router>
    </UserContext.Provider>
    </div>
  );
}

export default App;
