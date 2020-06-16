import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props.setLoggedInStatus(false);
    AuthenticationService.logout();
  }
  render(props) {
    return (
      <div>
        <h1>You are logged out.</h1>
        <div className="container">Thank you for using our application.</div>
      </div>
    );
  }
}

export default Logout;
