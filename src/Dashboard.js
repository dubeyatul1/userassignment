import React, { Component } from 'react';
class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="row">
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-primary o-hidden h-100">
                  <div className="card-body">
                    <div className="card-body-icon">
                      <i className="fas fa-fw fa-comments" />
                    </div>
                    <div className="mr-5">26 New Messages!</div>
                  </div>
                  <a
                    className="card-footer text-white clearfix small z-1"
                    href="#"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fas fa-angle-right" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-warning o-hidden h-100">
                  <div className="card-body">
                    <div className="card-body-icon">
                      <i className="fas fa-fw fa-list" />
                    </div>
                    <div className="mr-5">11 New Tasks!</div>
                  </div>
                  <a
                    className="card-footer text-white clearfix small z-1"
                    href="#"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fas fa-angle-right" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-success o-hidden h-100">
                  <div className="card-body">
                    <div className="card-body-icon">
                      <i className="fas fa-fw fa-shopping-cart" />
                    </div>
                    <div className="mr-5">123 New Orders!</div>
                  </div>
                  <a
                    className="card-footer text-white clearfix small z-1"
                    href="#"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fas fa-angle-right" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-danger o-hidden h-100">
                  <div className="card-body">
                    <div className="card-body-icon">
                      <i className="fas fa-fw fa-life-ring" />
                    </div>
                    <div className="mr-5">13 New Tickets!</div>
                  </div>
                  <a
                    className="card-footer text-white clearfix small z-1"
                    href="#"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fas fa-angle-right" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
         );
    }
}
 
export default Dashboard;