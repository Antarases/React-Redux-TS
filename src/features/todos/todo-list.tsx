import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {toggleTodo, editTodo, selectVisibleTodos, selectVisibilityFilter, fetchTodos, TodosLoadingStatus} from "./todosSlice";

const TodoList = () => {
    const todos = useAppSelector(selectVisibleTodos);
    const dispatch = useAppDispatch();

    const todosLoadingStatus = useAppSelector((state) => state.todos.todosLoadingStatus);
    const error = useAppSelector((state) => state.todos.error)

    useEffect(() => {
        if (todosLoadingStatus === TodosLoadingStatus.Idle) {
            dispatch(fetchTodos());
        }
    }, [todosLoadingStatus, dispatch])

    const handleTodoEditing = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();

        const title = prompt() || ""
        dispatch(editTodo({ id, title }));
    };

    let content;

    if (todosLoadingStatus === TodosLoadingStatus.Loading) {
        content = <div>Loading...</div>;
    } else if (todosLoadingStatus === TodosLoadingStatus.Succeeded) {
        content = <React.Fragment>
            {
                todos.map(todo => {
                    return <div
                        key={todo.id}
                        onClick={() => dispatch(toggleTodo(todo.id))}
                    >
                        <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                            {todo.title}
                        </span>

                        <button onClick={(e) => handleTodoEditing(todo.id, e)}>
                            Edit
                        </button>
                    </div>
                })
            }
        </React.Fragment>
    } else if (todosLoadingStatus === TodosLoadingStatus.Failed) {
        content = <div>{error}</div>
    }

    return (
        <section>
            {
                content
            }
        </section>
    );
};

export default TodoList;
