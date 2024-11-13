import React from 'react';
import './InputTodo.css';

const InputTodo = ({ value, description, onValueChange, onDescriptionChange, onAdd, isEditing }) => {
  return (
    <div className="input-container">
      <input
        placeholder="Название задачи"
        className="input"
        value={value}
        onChange={onValueChange}
      />
      <textarea
        placeholder="Описание задачи"
        className="textarea"
        value={description}
        onChange={onDescriptionChange}
        style={{ resize: "none" }}
      />
      <button className="button" onClick={onAdd}>
        {isEditing ? "Сохранить" : "Добавить"}
      </button>
    </div>
  );
};

export default InputTodo;
