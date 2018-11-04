import { Component } from 'react'
import { logoutUser } from "../../action/UserAction";
import { connect } from "react-redux";
const mapStateToProps = () =>{
  return true;
}
const mapDispatchToProps = dispatch => ({
  logoutUser:() => dispatch(logoutUser())
})

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props.logoutUser();
  }
  onLogoutClick = () => {
    this.props.logoutUser();
  }

  render() {
    return (
      {/* <button onClick={this.onLogoutClick.bind(this)} className="btn btn-primary">
        Logout
      </button> */}
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
