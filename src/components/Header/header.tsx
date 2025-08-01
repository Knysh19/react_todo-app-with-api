import React from 'react';

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onAddTodo: (e: React.FormEvent) => void;
  allCompleted: boolean;
  toggleAll: () => void;
  isSubmitting: boolean; // ⬅️ Додано новий проп
}

export const Header: React.FC<Props> = ({
  title,
  setTitle,
  onAddTodo,
  allCompleted,
  toggleAll,
  isSubmitting, // ⬅️ Отримуємо проп
}) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
      data-cy="ToggleAllButton"
      onClick={toggleAll}
    />
    <form onSubmit={onAddTodo}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={isSubmitting} // ⬅️ Заборона на час сабміту
        autoFocus
      />
    </form>
  </header>
);
