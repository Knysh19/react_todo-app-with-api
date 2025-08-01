import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/todoItem';

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
  onRename: (todo: Todo, newTitle: string) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onToggle,
  onRename,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onRename={onRename}
        />
      ))}
    </section>
  );
};
