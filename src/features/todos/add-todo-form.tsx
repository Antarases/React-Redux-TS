import React, { useState} from "react";

import {useAppDispatch} from "../../app/hooks";

import { addTodo } from "./todosSlice";

const AddTodoForm = () => {
    const [title, setTitle] = useState("");
    const dispatch = useAppDispatch();

    const handleTodoAdding = (title: string) => {
        dispatch(addTodo(title));

        setTitle("");
    }

    return (
        <div>
            <h3>Enter todo title</h3>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <button onClick={() => handleTodoAdding(title)}>
                Add Todo
            </button>
        </div>
    );
};

export default AddTodoForm;