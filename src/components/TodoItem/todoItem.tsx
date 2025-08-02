import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  loading: boolean;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onToggle,
  loading,
}) => (
  <div className={`todo ${todo.completed ? 'completed' : ''}`} data-cy="Todo">
    <label className="todo__status-label" aria-label="stat">
      <input
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        data-cy="TodoStatus"
        disabled={loading}
      />
    </label>
    <span className="todo__title" data-cy="TodoTitle">
      {todo.title}
    </span>
    <button
      type="button"
      className="todo__remove"
      onClick={() => onDelete(todo.id)}
      data-cy="TodoDelete"
      disabled={loading}
    >
      ×
    </button>
    <div
      data-cy="TodoLoader"
      className={`modal overlay${loading ? ' is-active' : ''}`}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);

// import React from 'react';
// import { Todo } from '../../types/Todo';

// interface Props {
//   todo: Todo;
//   onDelete: (id: number) => void;
//   onToggle: (id: number, completed: boolean) => void;
//   loading: boolean;
// }

// export const TodoItem: React.FC<Props> = ({
//   todo,
//   onDelete,
//   onToggle,
//   loading,
// }) => (
//   <div className={`todo ${todo.completed ? 'completed' : ''}`} data-cy="Todo">
//     <label className="todo__status-label" aria-label="stat">
//       <input
//         type="checkbox"
//         className="todo__status"
//         checked={todo.completed}
//         onChange={() => onToggle(todo.id, !todo.completed)}
//         data-cy="TodoStatus"
//       />
//     </label>
//     <span className="todo__title" data-cy="TodoTitle">
//       {todo.title}
//     </span>
//     <button
//       type="button"
//       className="todo__remove"
//       onClick={() => onDelete(todo.id)}
//       data-cy="TodoDelete"
//     >
//       ×
//     </button>
//     {loading && (
//       <div data-cy="TodoLoader" className="modal overlay">
//         <div className="modal-background has-background-white-ter" />
//         <div className="loader" />
//       </div>
//     )}
//   </div>
// );
