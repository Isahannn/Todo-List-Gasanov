import React from 'react';

class TodoItem extends React.Component {
  render() {
    const { todo, onChecked, onEdit, onDelete, isHovered } = this.props;
    return (
      <li className="todo-item" 
          onMouseEnter={this.props.onMouseEnter} 
          onMouseLeave={this.props.onMouseLeave}>
        <div className="todo-content">
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={onChecked}
            className="checkbox"
          />
          <div className="todo-text">
            <span className={todo.checked ? "text-checked" : ""}>{todo.name}</span>
            <p className="todo-description">{todo.description}</p>
          </div>
        </div>
        <span className="timestamp">{todo.timestamp}</span>
        {isHovered && (
          <div className="edit-buttons">
            <button className="edit-button" onClick={onEdit}>✎</button>
            <button className="delete-button" onClick={onDelete}>❌</button>
          </div>
        )}
      </li>
    );
  }
}

export default TodoItem;
