import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  render() {
    const { todos, onChecked, onEdit, onDelete, hoveredIndex, onMouseEnter, onMouseLeave } = this.props;
    return (
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChecked={() => onChecked(index)}
            onEdit={() => onEdit(index)}
            onDelete={() => onDelete(todo.id)}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;
