
import React, { Component } from "react";
import { connect } from "react-redux";
import { post } from 'axios';
import { Header, Sidebar, Breadcrumb, Footer } from "../shared/Common";
import { baseUrl } from "../../baseUrl";
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
    this.state ={
      file:null,
      imageURL: '',
    }
    
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  componentDidMount() {
    this.props.fetchUserById(this.props.match.params.userId);
  }


  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      this.setState({ imageURL: `${baseUrl}${response.data.filename}` });
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = baseUrl+'upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
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
      // console.log(this.dataArray.data);
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
              <img src="http://localhost:3001/public/uploads/profile/avatar-1541153576163.JPG" alt="img" width="400" height="400"/> 
              <form onSubmit={this.onFormSubmit}>
                    <h1>File Upload</h1>
                    <input type="file" onChange={this.onChange} />
                    <button type="submit">Upload</button>
                  </form>        
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
                <div className="table-responsive">
                {renderUser}
                </div>
              </div>
              <div className="card-footer small text-muted" />
            </div>
          </div>
          <Footer />
        </div>
      </div>      
   )
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);