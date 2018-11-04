import React, { Component } from "react";
import { loginUser } from "../../action/UserAction";
import { connect } from "react-redux";
const BODY_CLASS = "bg-dark";

const mapStateToProps = (state) =>{
    return {
        isFetching: state.isFetching,
        isAuthenticated: state.isAuthenticated,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser:(cred) => dispatch(loginUser(cred))
})

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: ""
    };
  }
  componentDidMount() {
    document.body.classList.add(BODY_CLASS);
  }

  componentWillUnmount() {
    document.body.classList.remove(BODY_CLASS);
  }

  handleChange = e => {
    //   console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {  
      // console.log(this.state.email);
    const creds = { email: this.state.email.trim(), password: this.state.password.trim() }
    // console.log(creds);
    this.props.loginUser(creds) ;
    e.preventDefault();    
  }

  render() {   
    return (
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="email"
                    name="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required="required"
                    autoFocus="autoFocus"
                    onChange={this.handleChange.bind(this)}
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="password"
                    name="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required="required"
                    onChange={this.handleChange.bind(this)}
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="remember-me" />
                    Remember Password
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            <div className="text-center">
              <a className="d-block small mt-3" href="/signup">
                Register an Account
              </a>
              <a className="d-block small" href="/forgot-password">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
