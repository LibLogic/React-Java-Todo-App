import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import TodoDataService from "../../api/todo/TodoDataService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      description: "",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    TodoDataService.retrieveTodo(
      AuthenticationService.getLoggedInUserName(),
      this.state.id
    ).then((response) => {
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
      });
    });
  }

  render() {
    let { description, targetDate } = this.state;
    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="targetDate">Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  onSubmit(values) {
    let username = AuthenticationService.getLoggedInUserName();
    let id = this.props.match.params.id;
    TodoDataService.updateTodo(username, id, {
      id: id,
      username: username,
      description: values.description,
      targetDate: moment(values.targetDate).format("YYYY-MM-DD"),
    })
      .then(() => this.props.history.push("/todos"))
      .catch((error) => console.log(error.message));
  }

  validate(values) {
    let errors = {};
    if (values.description.length < 5) {
      errors.description =
        "Please Provide a Description of at Least 5 Characters";
    }
    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Target Date is Invalid";
    }
    return errors;
  }
}

export default Todo;
