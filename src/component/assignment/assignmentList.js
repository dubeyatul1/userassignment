import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Loading } from "../shared/LoadingComponent";
import FilterTableData from "../shared/FilterTableData";

class AssignmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      sortBy: 'email',
      orderBy: 1,
      skip:0,
      limit:10
    }
  }

  handleSearch = (params) => {
    this.setState({ searchText: params });
  };

  handleParentSort = (sortBy) => {
    this.setState({ sortBy: '' },()=>{
      if (this.state.orderBy === 1) {
        this.setState({ orderBy: -1 });
      } else {
        this.setState({ orderBy: 1 });
      }
      this.setState({ sortBy: sortBy },() => {
        this.props.callback({ 
          'sortBy': this.state.sortBy,
          'orderBy': this.state.orderBy,
          'skip': this.state.skip,
          'limit': this.state.limit
         });
      });      
    });  
  }

  handlePaginate = (sortBy, orderBy, skip, limit) =>{
    this.setState({skip:''}, ()=>{
      this.setState({skip:skip}, ()=>{
        this.props.callback({ 
          'sortBy': sortBy,
          'orderBy': orderBy,
          'skip': this.state.skip,
          'limit': this.state.limit
         });
      });
    });   
     
  }

  createLi = (count)=>{
    let li = [];
    for (let i = 0; i < count-1; i++) {
      li.push(<PaginationItem 
                key={i}
                onClick={
                  () => this.handlePaginate(this.state.sortBy, this.state.orderBy, (i*10), this.state.limit)}
              >
        {
          <PaginationLink  className="page-link" href="javascript:void(0)" >{i+1}</PaginationLink >
        }
      </PaginationItem>)
    }
    return li;
  }

  render() {
    // console.log(this.props.assignList.assignment.assgnCount);
    let renderPagination;
    let paginate;
    let renderSortArrow;
    if (this.state.orderBy === 1) {
      renderSortArrow = (
        <i className="fa fa-caret-down"></i>
      )
    } else {
      renderSortArrow = (
        <i className="fa fa-caret-up"></i>
      )
    }


    // console.log(this.props.assignList.assignment);
    let renderAssignment;
    if (
      this.props.assignList.assignment.isLoading ||
      this.props.assignList.assignment.isLoading === "undefined"
    ) {
      renderAssignment = (
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
    } else if (this.props.assignList.assignment.isLoading === false) {
      {/* console.log(this.props.assignList.assignment.data);
      return false; */}
      const filteredAssignment = this.props.assignList.assignment.data.filter((assignMnt) => {
        return assignMnt.user.email.toLowerCase().includes(this.state.searchText.toLowerCase());
      });
      renderAssignment = filteredAssignment.map(
        (assignmnt, index) => (
          <tr key={assignmnt._id}>
            <td>{index + 1}</td>
            <td>{assignmnt.createdAt.toString()}</td>
            <td>{assignmnt.orderId}</td>
            <td>{assignmnt.deadLine}</td>
            <td>{assignmnt.user.email}</td>
            <td>{"NA"}</td>
            <td>{assignmnt.user.phone}</td>
            <td>{assignmnt.status}</td>
          </tr>
        )
      );
      let assnmtCount = this.props.assignList.assignment.assgnCount;    
      paginate = (assnmtCount > 10)?((assnmtCount / 10 === 0)? (assnmtCount.length / 10) : (assnmtCount / 10)+1):'';
      // console.log('paginate', paginate);
      renderPagination = (
       <Pagination aria-label="Page navigation example">
            {this.createLi(paginate)}
         </Pagination>)   
    }
    return (
      <div className="card mb-3">
        <div className="card-header">
          <i className={(this.props.newoder)?'fa fa-cart-arrow-down':'fa fa-book'} /> { }
          {(this.props.newoder)?'Fresh Assignments':'Assignments'}
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
                  <th onClick={() => this.handleParentSort('createdAt', 1, this.state.skip, this.state.limit)} className="cursor">
                    Date/Time{' '}{renderSortArrow}
                  </th>
                  <th onClick={() => this.handleParentSort('orderId', 1, this.state.skip, this.state.limit)} className="cursor">
                    Order Id{' '}{renderSortArrow}
                  </th>
                  <th onClick={() => this.handleParentSort('deadLine', 1, this.state.skip, this.state.limit)} className="cursor">
                    Deadline{' '}{renderSortArrow}
                  </th>
                  <th onClick={() => this.handleParentSort('email', 1, this.state.skip, this.state.limit)} className="cursor">
                    Email{' '}{renderSortArrow}
                  </th>
                  <th onClick={() => this.handleParentSort('phone', 1, this.state.skip, this.state.limit)} className="cursor">
                    Country{' '}{renderSortArrow}
                  </th>
                  <th onClick={() => this.handleParentSort('phone', 1, this.state.skip, this.state.limit)} className="cursor">
                    Mobile{' '}{renderSortArrow}
                  </th>
                  <th onClick={() => this.handleParentSort('status', 1, this.state.skip, this.state.limit)} className="cursor">
                    Status{' '}{renderSortArrow}
                  </th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th colSpan="4">
                     {renderPagination} 
                    </th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>{renderAssignment}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignmentList;
