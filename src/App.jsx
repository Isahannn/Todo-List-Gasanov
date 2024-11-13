import React from "react";
import './App.css';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem'; 

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      description: "",
      todos: [],
      isEditing: false,
      editingIndex: null,
      warning: "",
      hoveredIndex: null,
      filterUncompleted: false,
    };
  }
  // Название задачи можно редактировать
  handleInputChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ' ').trim();
    this.setState({ value });
  };

  handleDescriptionChange = (e) => {
    const description = e.target.value.replace(/\s+/g, ' ').trim();
    this.setState({ description });
  };

  handleTodoAdd = () => {
    const { value, description, todos, isEditing, editingIndex } = this.state;
  
    if (!value.trim()) {
      this.setState({ warning: "Название задачи не может быть пустым или состоять только из пробелов." });
      return;
    }
  
    if (!isEditing) {
      const existingTodo = todos.find(todo => todo.name === value && todo.description === description);
      if (existingTodo) {
        this.setState({ warning: "Задача с таким названием и описанием уже существует." });
        return;
      }
    } else {
      const currentTodo = todos[editingIndex];
      if (currentTodo.name !== value || currentTodo.description !== description) {
        const existingTodo = todos.find((todo, index) => 
          index !== editingIndex && todo.name === value && todo.description === description
        );
        if (existingTodo) {
          this.setState({ warning: "Задача с таким названием и описанием уже существует." });
          return;
        }
      }
    }
  
    const newTodo = {
      id: Date.now(),
      name: value,
      description: description,
      checked: false,
      timestamp: new Date().toLocaleString(),
      originalIndex: todos.length,
    };
  
    if (isEditing) {
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? { ...newTodo } : todo
      );
      this.setState({
        todos: updatedTodos,
        value: "",
        description: "",
        isEditing: false,
        editingIndex: null,
        warning: "",
      });
    } else {
      this.setState({
        todos: [...todos, newTodo],
        value: "",
        description: "",
        warning: "",
      });
    }
  };
  
  
  handleTodoChecked = (index) => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
  
      const uncompletedTodos = updatedTodos.filter(todo => !todo.checked);
      const completedTodos = updatedTodos.filter(todo => todo.checked);
      const sortedUncompleted = uncompletedTodos.sort((a, b) => a.originalIndex - b.originalIndex);
  
      return { todos: [...sortedUncompleted, ...completedTodos] };
    });
  };
  

  handleTodoDelete = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  };

  handleDeleteAll = () => {
    if (window.confirm("Вы уверены, что хотите удалить все задачи?")) {
      this.setState({ todos: [] });
    }
  };

  handleTodoEdit = (index) => {
    const todoToEdit = this.state.todos[index];
    this.setState({
      value: todoToEdit.name,
      description: todoToEdit.description,
      isEditing: true,
      editingIndex: index,
    });
  };

  toggleFilter = () => {
    this.setState((prevState) => ({
      filterUncompleted: !prevState.filterUncompleted,
    }));
  };

  render() {
    const { value, description, todos, warning, hoveredIndex, filterUncompleted } = this.state;

    const filteredTodos = filterUncompleted
      ? todos.filter(todo => !todo.checked).sort((a, b) => a.originalIndex - b.originalIndex)
      : todos;

    return (
      <div className="app-container">
        <h1 className="app-title">Список задач</h1>
        {warning && <div className="warning">{warning}</div>}
        
        <InputTodo
          value={value}
          description={description}
          onValueChange={this.handleInputChange}
          onDescriptionChange={this.handleDescriptionChange}
          onAdd={this.handleTodoAdd}
          isEditing={this.state.isEditing}
        />
        <button className="filter-button" onClick={this.toggleFilter}>
          {filterUncompleted ? "Показать все задачи" : "Показать невыполненные"}
        </button>
        <button className="delete-all-button" onClick={this.handleDeleteAll}>
          Удалить все задачи
        </button>
        <TodoList
          todos={filteredTodos}
          onChecked={this.handleTodoChecked}
          onEdit={this.handleTodoEdit}
          onDelete={this.handleTodoDelete}
          hoveredIndex={hoveredIndex}
          onMouseEnter={(index) => this.setState({ hoveredIndex: index })}
          onMouseLeave={() => this.setState({ hoveredIndex: null })}
        />
      </div>
    );
  }
}

export default App;
