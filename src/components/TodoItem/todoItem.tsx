import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
  onRename: (todo: Todo, newTitle: string) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onToggle,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const trimmed = editTitle.trim();
    if (trimmed === '') {
      onDelete(todo.id);
    } else {
      onRename(todo, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`todo ${todo.completed ? 'completed' : ''} ${
        isEditing ? 'editing' : ''
      }`}
      data-cy="Todo"
    >
      <div data-cy="TodoLoader" />

      <label className="todo__status-label" aria-label="stat">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          data-cy="TodoStatus"
        />
      </label>

      {!isEditing ? (
        <span
          className="todo__title"
          data-cy="TodoTitle"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      ) : (
        <input
          type="text"
          className="todo__title-field"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onBlur={handleSubmit}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          onClick={() => onDelete(todo.id)}
          data-cy="TodoDelete"
        >
          ×
        </button>
      )}
    </div>
  );
};
