import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Sidebar, Breadcrumb, Footer } from "../shared/Common";
import { Loading } from "../shared/LoadingComponent";
import { fetchUserById } from "../../action/UserAction";

const mapStateToProps = state => {
  return {
    user: state.userProfile
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUserById: userId => dispatch(fetchUserById(userId))
});

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.dataArray = [];
    // this.state = {
    //   name: dataArray.name,
    //   email:dataArray.email,
    //   phone:dataArray.phone,
    //   state:dataArray.state,
    //   userType:dataArray.userType,
    //   zip:dataArray.zip,
    //   city:dataArray.city,
    //   country:dataArray.country,
    //   address:dataArray.address
    // }
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.props.fetchUserById(this.props.match.params.userId);
  }

  handleUpload(event) {
    console.log(this.fileInput.current.files[0].name);
  }

  render() {
    this.dataArray = this.props.user.userProfile;
    let renderUser;
    if (this.dataArray.isLoading || this.dataArray.isLoading === "undefined") {
      renderUser = (
        <table
          className="table table-bordered"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <td>
                <div className="container">
                  <div className="row">
                    <Loading />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else if (this.dataArray.isLoading === false) {
      console.log(this.dataArray.data);
      renderUser = (
        <table
          className="table table-bordered"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <td rowSpan="4" colSpan="2">
              <img src={`${this.dataArray.data.profile}`}  width="400" height="400"/> 
              <div className="form-group">
                    <label htmlFor="profile">Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profile"
                      name="profile"
                      ref={this.fileInput}
                      onChange={this.handleUpload.bind(this)}
                    />
                  </div>
              </td>               
              <th>Name: </th>
              <td>{this.dataArray.data.name}</td>
              <td>Email:</td>
              <td>{this.dataArray.data.email}</td>
            </tr>
            <tr>             
              <th>Phone:</th>
              <td>{this.dataArray.data.phone}</td>
              <th>Address:</th>
              <td>{this.dataArray.data.address}</td>
            </tr>
            <tr>              
              <th>Country:</th>
              <td>{this.dataArray.data.country}</td>
              <th>State:</th>
              <td>{this.dataArray.data.state}</td>
            </tr>
            <tr>              
              <th>City:</th>
              <td>{this.dataArray.data.city}</td>
              <th>Zip:</th>
              <td>{this.dataArray.data.zip}</td>
            </tr>
            <tr>           
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <th>User Type</th>
              <td>{this.dataArray.data.userType}</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      );
    }
    return (
      <div className="App">
        <Header />
        <div id="wrapper">
          <Sidebar />
          <div className="container-fluid">
            <Breadcrumb title="Users" />
            <div className="card mb-3">
              <div className="card-body">
                <div className="table-responsive"> {renderUser}</div>
              </div>
              <div className="card-footer small text-muted" />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
