import React, { Component } from "react";
import {Link } from "react-router-dom";
import { Loading } from "../shared/LoadingComponent";
import FilterTableData from "../shared/FilterTableData";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        sortyBy: '',
        orderBy:1,
        searchText: ''
     }
  }

  handleSearch = (params) => {
    this.setState({ searchText: params });
  };

  handleDelete = (id) => {
    this.props.callback({ 
      'userId': id
     }); 
  }

  render() {       
    // console.log(this.props.usersList);
    let renderUser;
    if (this.props.usersList.users.isLoading || this.props.usersList.users.isLoading === 'undefined') {
      renderUser = (
        <tr>
          <td>
            <div className="container">
              <div className="row">
                <Loading />
              </div>
            </div>
          </td>
        </tr>
      );
    } else if(this.props.usersList.users.isLoading === false) { 
      const filteredUsers = this.props.usersList.users.data.filter((user) => {
        return user.email.toLowerCase().includes(this.state.searchText.toLowerCase());
      })
      renderUser = (              
        filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <Link
                 to={`/user-profile/${user._id}`}   exact="true" >{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <i className="fa fa-times" aria-hidden="true" onClick={(e) => this.handleDelete(user._id)}></i>
              </td>
            </tr>
            ))
      )
    }

    return (
      <div className="card mb-3">
        <div className="card-header">
          <i className="fas fa-table" />
          Users
          <FilterTableData callback={this.handleSearch.bind(this)} />
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th><i className="fa fa-trash" aria-hidden="true"></i></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>{renderUser}</tbody>
            </table>
          </div>
        </div>
        <div className="card-footer small text-muted">
          Updated yesterday at 11:59 PM
        </div>
      </div>
    );
  }
}

export default UserList;
