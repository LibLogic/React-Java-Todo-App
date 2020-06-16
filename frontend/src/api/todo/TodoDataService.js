import axios from "axios";
import { JPA_URL } from "../../components/todo/Constants";

class TodoDataService {
  retrieveAllTodos(name) {
    return axios.get(`${JPA_URL}/users/${name}/todos`);
  }

  retrieveTodo(name, id) {
    return axios.get(`${JPA_URL}/users/${name}/todos/${id}`);
  }

  addTodo(name, id, todo) {
    return axios.put(`${JPA_URL}/users/${name}/todos/${id}`, todo);
  }

  deleteTodo(name, id) {
    return axios.delete(`${JPA_URL}/users/${name}/todos/${id}`);
  }

  updateTodo(name, id, todo) {
    return axios.put(`${JPA_URL}/users/${name}/todos/${id}`, todo);
  }
}

export default new TodoDataService();
