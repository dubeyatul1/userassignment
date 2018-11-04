import React, { Component } from 'react';
import { connect } from "react-redux";
import { Header, Sidebar, Breadcrumb, Footer  } from "../shared/Common";
import UserList from './UserList';
import { fetchUsers, deleteUserById } from "../../action/UserAction";

const mapStateToProps = (state) =>{
    return {
        users:state.users
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUsers:() => dispatch(fetchUsers()),
    deleteUserById:(userId) => dispatch(deleteUserById(userId)),
});

class User extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() { 
        this.props.fetchUsers();
    }

    deleteHandler = (params)=>{
        if (window.confirm('Are you sure you want to delete this form database?') && params.userId) {
            console.log(params.userId);
            this.props.deleteUserById(params.userId);
        } else {
            console.log('Note deleted');
        } 
    }

    render() { 
        console.log(this.props.users.users);
        return ( 
                <div className="App">
                    <Header />
                    <div id="wrapper">
                    <Sidebar />
                    <div className="container-fluid">
                        <Breadcrumb title="Users" />
                        <UserList
                         usersList={this.props.users} 
                         callback={this.deleteHandler.bind(this)} />
                    </div>
                    <Footer />
                    </div>
            </div>
        );
    }
}
 

export default connect(mapStateToProps, mapDispatchToProps)(User);