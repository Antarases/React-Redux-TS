import React from "react";

import AddTodoForm from "../../features/todos/add-todo-form";
import TodoList from "../../features/todos/todo-list";
import TodoFilters from "../../features/todos/todo-filters";

export default function TodosPage() {
    return (
        <React.Fragment>
            <AddTodoForm/>

            <TodoList/>

            <TodoFilters/>
        </React.Fragment>
    );
}
