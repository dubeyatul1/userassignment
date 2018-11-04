import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import Login from "../component/user/Login";
import Register from "../component/user/Register";
import User from "../component/user/User";
import ForgotPassword from "../component/user/ForgotPassword";
import Assignments from '../component/assignment/assignment';
import AddUsers from '../component/user/AddUser';
import Logout from '../component/user/Logout';
import UserProfile from '../component/user/UserProfile';

class Router extends Component {
    render() { 
        return ( 
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={App} />
                    <Route exact path='/users' component={User} />
                    <Route exact path='/assignments' component={Assignments} />
                    <Route exact path='/create-admin' component={AddUsers} /> 
                    <Route exact path='/login' component={Login} />   
                    <Route exact path='/logout' component={Logout} />              
                    <Route exact path='/signup' component={Register} />
                    <Route exact path='/forgot-password' component={ForgotPassword} />
                    <Route exact path='/user-profile/:userId' component={UserProfile}/>
                </Switch>
            </BrowserRouter>
         );
    }
}
 
export default Router;