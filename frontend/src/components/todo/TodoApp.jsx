import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Header from "./Header";
import Welcome from "./Welcome";
import ListTodos from "./ListTodos";
import Todo from "./Todo";
import Login from "./Login";
import Logout from "./Logout";
import Footer from "./Footer";
import Error from "./Error";

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("authenticateUserName") ? true : false,
    };

    this.setLoggedIn = this.setLoggedIn.bind(this);
  }

  render() {
    return (
      <div className="todoApp">
        <Router>
          <Header loggedInStatus={this.state.loggedIn} />
          <Switch>
            <AuthenticatedRoute path="/" exact component={Login} />
            <AuthenticatedRoute path="/welcome" exact component={Welcome} />
            <AuthenticatedRoute path="/todo/:id" exact component={Todo} />
            <AuthenticatedRoute path="/welcome/:name" component={Welcome} />
            <AuthenticatedRoute path="/todos" exact component={ListTodos} />

            <Route
              path="/login"
              exact
              render={(props) => (
                <Login {...props} setLoggedInStatus={this.setLoggedIn} />
              )}
            />

            <AuthenticatedRoute
              path="/logout"
              exact
              render={(props) => (
                <Logout {...props} setLoggedInStatus={this.setLoggedIn} />
              )}
            />

            <Route component={Error} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }

  setLoggedIn(childData) {
    this.setState({ loggedIn: childData });
  }
}

export default TodoApp;
