import React, { Component } from 'react';
import { connect } from "react-redux";
import { Header, Sidebar, Breadcrumb, Footer  } from "../shared/Common";
import AssignmentList from './assignmentList';
import { fetchAssignment, fetchAssignmentCount } from '../../action/AssignmentActon';

const mapStateToProps = (state)=>{
    return {
        assignments:state.assignments
    }
}

const mapDispatchToProps = dispatch => ({
    fetchAssignment:(sortyBy, orderBy, skip, limit, newoder) => {dispatch(fetchAssignment(sortyBy, orderBy, skip, limit, newoder))},
    fetchAssignmentCount:(newoder) => dispatch(fetchAssignmentCount(newoder))
});
 
class Assignments extends Component {
    constructor(props){
        super(props);
        this.state = { 
            sortBy: 'status',
            orderBy: '-1',
            skip:0,
            limit:10,
            newoder:(this.props.location.search)?this.props.location.search:''
         }
        //  console.log(this.props.location.search);
      }

    componentDidMount() { 
        this.props.fetchAssignment(this.state.sortBy, this.state.orderBy, this.state.skip, this.state.limit, this.state.newoder);
        this.props.fetchAssignmentCount(this.state.newoder)
    }

    hanldeSort = (params)=>{
        this.setState({
            sortBy:params.sortBy,
            orderBy:params.orderBy,
            skip:params.skip,
            limit:params.limit
        }, () =>{
            this.props.fetchAssignment(this.state.sortBy, this.state.orderBy, this.state.skip, this.state.limit, this.state.newoder);
        });        
    }
    
    shouldComponentUpdate(nextState){
        // console.log(nextProps, nextState);
        const differentSortBy = this.state.sortBy !== nextState.sortBy;
        const differentOrderBy = this.state.orderBy !== nextState.orderBy
        return differentSortBy || differentOrderBy;
    }

    render() { 
        return ( 
            <div className="App">
                <Header />
                <div id="wrapper">
                <Sidebar />
                <div className="container-fluid">
                    <Breadcrumb title={(this.state.newoder)?'New Orders':'Assignment'}/>
                    <AssignmentList 
                    assignList={this.props.assignments}
                    callback={this.hanldeSort.bind(this)}
                    newoder={this.state.newoder}/>
                </div>
                <Footer />
                </div>
        </div>
    );
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Assignments);