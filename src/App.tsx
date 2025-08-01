import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import {
  getTodos,
  createTodo,
  deleteTodo,
  clearCompletedTodos,
  USER_ID,
  patchTodo,
} from './api/todos';
import { Header } from './components/Header/header';
import { TodoList } from './components/TodoList/todoList';
import { Footer } from './components/Footer/footer';
import { ErrorNotification } from './components/error/ErrorNotification';
import { FilterType } from './types/Todo';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- Новий стан

  useEffect(() => {
    setError('');
    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const t = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(t);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filtered = todos.filter(t =>
    filter === FilterType.All
      ? true
      : filter === FilterType.Active
        ? !t.completed
        : t.completed,
  );

  const activeCount = todos.filter(t => !t.completed).length;
  const hasCompleted = todos.some(t => t.completed);
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const txt = title.trim();

    if (!txt) {
      setError('Title should not be empty');

      return;
    }

    setIsSubmitting(true); // <-- Блокуємо інпут

    try {
      const res = await createTodo(txt);
      setTodos(prev => [...prev, res]);
      setTitle('');
    } catch {
      setError('Unable to add a todo');
    } finally {
      setIsSubmitting(false); // <-- Розблокуємо інпут
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      setError('Unable to delete a todo');
    }
  };

  const handleClear = async () => {
    try {
      const ids = todos.filter(t => t.completed).map(t => t.id);

      await clearCompletedTodos(ids);
      setTodos(prev => prev.filter(t => !t.completed));
    } catch {
      setError('Unable to clear completed todos');
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await patchTodo(todo.id, { completed: !todo.completed });

      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
    } catch {
      setError('Unable to update a todo');
    }
  };

  const handleRename = async (todo: Todo, newTitle: string) => {
    if (newTitle.trim() === '') {
      handleDelete(todo.id);
      return;
    }

    if (newTitle === todo.title) {
      return;
    }

    try {
      const updated = await patchTodo(todo.id, { title: newTitle });
      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
    } catch {
      setError('Unable to update a todo');
    }
  };

  const toggleAll = async () => {
    const newStatus = !allCompleted;
    const updates = todos.filter(t => t.completed !== newStatus);

    const updatedTodos = await Promise.all(
      updates.map(async t => {
        try {
          return await patchTodo(t.id, { completed: newStatus });
        } catch {
          setError('Unable to update a todo');
          return t;
        }
      }),
    );

    setTodos(prev =>
      prev.map(t => updatedTodos.find(ut => ut.id === t.id) || t),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {error && <div className="notification is-danger is-light">{error}</div>}

      <div className="todoapp__content">
        <Header
          title={title}
          setTitle={setTitle}
          onAddTodo={handleAdd}
          allCompleted={allCompleted}
          toggleAll={toggleAll}
          isSubmitting={isSubmitting}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filtered}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onRename={handleRename}
            />
            <Footer
              filter={filter}
              setFilter={setFilter}
              activeCount={activeCount}
              hasCompleted={hasCompleted}
              onClearCompleted={handleClear}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} onClose={() => setError('')} />
    </div>
  );
};
