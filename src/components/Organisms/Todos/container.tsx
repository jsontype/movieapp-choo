import React from "react";
import Todos from ".";

import { addTodo, toggleTodo, deleteTodo } from "modules/todos";
import { useDispatch, useSelector } from "react-redux";

export default function container() {
  // state
  const todos = useSelector((state: any) => state.todos);
  // dispatch
  const dispatch = useDispatch();
  const onCreate = (title: string) => dispatch(addTodo(title));
  const onCompleted = (id: number) => dispatch(toggleTodo(id));
  const onDelete = (id: number) => dispatch(deleteTodo(id));

  return (
    <>
      <Todos
        todos={todos}
        onCreate={onCreate}
        onCompleted={onCompleted}
        onDelete={onDelete}
      />
    </>
  );
}
