import React, { Component } from "react";
import "./App.css";
import {Header, Sidebar, Breadcrumb, Footer  } from "./component/shared/Common";
import Dashboard from "./Dashboard";


class App extends Component {  
  render() { 
    return (
      <div className="App">
        <Header />
        <div id="wrapper">
          <Sidebar />
          <div className="container-fluid">
            <Breadcrumb />
            <Dashboard />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
