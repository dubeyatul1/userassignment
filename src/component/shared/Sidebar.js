import React, { Component  } from "react";
import {Link } from "react-router-dom";
class Sidebar extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <ul className="sidebar navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link"to="/">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
           to="#"
            id="pagesDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-fw fa-folder" />
            <span>Pages</span>
          </Link>
          <div className="dropdown-menu" aria-labelledby="pagesDropdown">
            <h6 className="dropdown-header">Login Screens:</h6>
            <Link className="dropdown-item"to="login.html">
              Login
            </Link>
            <Link className="dropdown-item"to="register.html">
              Register
            </Link>
            <Link className="dropdown-item"to="forgot-password.html">
              Forgot Password
            </Link>
            <div className="dropdown-divider" />
            <h6 className="dropdown-header">Other Pages:</h6>
            <Link className="dropdown-item"to="404.html">
              404 Page
            </Link>
            <Link className="dropdown-item"to="blank.html">
              Blank Page
            </Link>
          </div>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to="charts.html">
            <i className="fas fa-fw fa-chart-area" />
            <span>Charts</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to="/assignments">
            <i className="fa fa-book" />
            <span>Assignment</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to="/assignments?type=new">
            <i className="fa fa-cart-arrow-down" />
            <span>New Order</span>
          </Link>
        </li>
        <li className="nav-item">
        <Link to="/create-admin" className="nav-link">
          <i className="fa fa-user-secret" />
          <span>Create Admin</span>
        </Link>          
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link">
            <i className="fa fa-female" />
            <span>Users</span>            
          </Link>        
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout">
            <i className="fa fa fa-power-off" /> 
            <span>Logout</span>
          </Link>          
        </li>
      </ul>
    );
  }
}

export default Sidebar; 