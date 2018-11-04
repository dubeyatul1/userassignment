import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Sidebar, Breadcrumb, Footer } from "../shared/Common";
import { Loading } from "../shared/LoadingComponent";
import { fetchCountries } from "../../action/CountryAction";
import { createUsers } from "../../action/UserAction";

const mapStateToProps = state => {
  return {
    countries: state.countries
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCountries: () => dispatch(fetchCountries()),
  createUsers: users => dispatch(createUsers(users))
});

class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Create Admin",
      stateName: [],
      cityName: [],
      formFields: {
        name: "",
        email: "",
        phone: "",
        password: "",
        userType: "admin",
        country: "",
        state: "",
        city: "",
        zip: "",
        address: "",
        profile: ""
      }
    };
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.props.fetchCountries();
  }

  handleState = (e, countryId, event) => {
    // console.log('countryName',  event.target[event.target.selectedIndex].text);
    let countryName =  event.target[event.target.selectedIndex].text;
    // var id = event.target.selectedIndex;
    //         alert('native: ' + event.target[event.target.selectedIndex].text);
    this.setState(prevState => ({
      formFields: {
        ...prevState.formFields,
        ["country"]: countryId
      }
    }));
    const statsArray = this.props.countries.countries.countries.filter(
      stateName => {
        return stateName._id.includes(countryId);
      }
    );
    // console.log(statsArray[0]);
    if (statsArray[0]) {
      this.setState({ stateName: statsArray[0] });
    }
  };

  handleCity = (e, stateName) => {
    this.setState(prevState => ({
      formFields: {
        ...prevState.formFields,
        ["state"]: stateName
      }
    }));
    const cityArray = this.state.stateName.States.filter(stateCity => {
      return stateCity.StateName.includes(stateName);
    });
    if (cityArray[0]) {
      this.setState({ cityName: cityArray[0] });
    }
  };

  handleChange(event) {
    const id = event.target.id;
    const value = event.target.value; 
    this.setState(prevState => ({
      formFields: {
        ...prevState.formFields,
        [id]: value
      }
    }));
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createUsers(this.state.formFields);
    e.preventDefault();
    this.setState({ formFields: {} });
    setTimeout(function() {
      window.location = "/users";
    }, 500);
    // console.log(788787);
  };

  render() {
    let renderDefult = (
      <select className="form-control">
        <option value="">Choose...</option>
      </select>
    );

    let renderCities;
    if (this.state.cityName.Cities) {
      renderCities = (
        <select
          id="city"
          className="form-control"
          value={this.state.formFields.city}
          onChange={this.handleChange.bind(this)}
        >
          <option value="">Choose...</option>
          {this.state.cityName.Cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      );
    } else {
      renderCities = renderDefult;
    }

    let renderStates;
    if (this.state.stateName.States) {
      renderStates = (
        <select
          id="state"
          className="form-control"
          value={this.state.formFields.state}
          onChange={e => {
            this.handleCity(this, e.target.value);
            this.handleChange.bind(this);
          }}
        >
          <option value="">Choose...</option>
          {this.state.stateName.States.map(States => (
            <option key={States.StateName} value={States.StateName}>
              {States.StateName}
            </option>
          ))}
        </select>
      );
    } else {
      renderStates = renderDefult;
    }

    let renderCounties;
    if (
      this.props.countries.countries.isLoading ||
      this.props.countries.countries.isLoading === "undefined"
    ) {
      renderCounties = (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.countries.countries.isLoading === false) {
      renderCounties = (
        <select
          id="country"
          className="form-control"
          value={this.state.formFields.country}
          onChange={this.handleChange.bind(this)}
          onChange={e => this.handleState(this, e.target.value, e )}
        >
          <option value="">Choose...</option>
          {this.props.countries.countries.countries.map(country => (
            <option key={country._id} value={country._id}>
              {country.CountryName}
            </option>
          ))}
        </select>
      );
    }
    return (
      <div className="App">
        <Header />
        <div id="wrapper">
          <Sidebar />
          <div className="container-fluid">
            <Breadcrumb title={this.state.title} />
            <div className="row">
              <div
                className="col-sm-2"
                style={{ backgroundColor: "lavender" }}
              />
              <div
                className="col-sm-8"
                style={{ backgroundColor: "lavenderblush" }}
              >
                <form className="addUser" onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        value={this.state.formFields.name}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email"
                        value={this.state.formFields.email}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="******"
                        value={this.state.formFields.password}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="cpassword">Confirm Password</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cpassword"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-5">
                      <label htmlFor="name">Contact Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="+910121455472"
                        value={this.state.formFields.phone}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="userType">User Type</label>
                      <select
                        id="userType"
                        className="form-control"
                        value={this.state.formFields.userType}
                        onChange={this.handleChange.bind(this)}
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="student">Student</option>
                      </select>
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="countries">Country</label>
                      {renderCounties}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputState">State</label>
                      {renderStates}
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="inputCity">City</label>
                      {renderCities}
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="inputZip">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        value={this.state.formFields.zip}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="profile">Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profile"
                      name="profile"
                      ref={this.fileInput}
                      value={this.state.formFields.profile}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Address</label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows="3"
                      value={this.state.formFields.address}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4" />
                    <div className="form-group col-md-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="form-group col-md-4" />
                  </div>
                </form>
              </div>
              <div
                className="col-sm-2"
                style={{ backgroundColor: "lavender" }}
              />
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
)(AddUsers);
