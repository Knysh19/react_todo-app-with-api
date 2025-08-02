import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/todoItem';

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  loadingId: number | null;
  loadingTodoIds: number[];
  tempId: number | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onToggle,
  loadingTodoIds,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onToggle={onToggle}
        loading={loadingTodoIds.includes(todo.id)}
      />
    ))}
  </section>
);
