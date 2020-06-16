import React from "react";
import "./App.css";
import "./components/todo/todos.css";
import TodoApp from "./components/todo/TodoApp";
// import "./components/counter/Counter.css";
// import Counter from "./components/counter/Counter";

function App() {
  // return <div className="App"><Counter /></div>;
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
