import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

class ListTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.addNewTodo = this.addNewTodo.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.getAllTodos = this.getAllTodos.bind(this);
  }

  componentDidMount() {
    this.getAllTodos();
  }
  render() {
    return (
      <div className="listTodos">
        <h1>List Todos</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Completed?</th>
              <th>Target Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{moment(todo.targetDate).utc().format("MM-DD-YYYY")}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => this.onUpdate(todo.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => this.onDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success" onClick={this.addNewTodo}>
          Add New Todo
        </button>
      </div>
    );
  }

  addNewTodo() {
    this.props.history.push(`/todo/${-1}`);
  }

  getAllTodos() {
    TodoDataService.retrieveAllTodos(
      AuthenticationService.getLoggedInUserName()
    )
      .then((response) => {
        this.setState({
          todos: response.data,
        });
      })
      .catch((error) => console.log(error.message));
  }

  onDelete(id) {
    TodoDataService.deleteTodo(AuthenticationService.getLoggedInUserName(), id)
      .then(() => this.getAllTodos())
      .catch((error) => console.log(error.message));
  }

  onUpdate(id) {
    this.props.history.push(`/todo/${id}`);
  }
}

export default ListTodos;
