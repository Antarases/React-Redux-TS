import { createSlice, createAsyncThunk, PayloadAction, nanoid } from  "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

import axios from "axios";

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export type VisibilityFilterType = "SHOW_ALL" | "SHOW_ACTIVE" | "SHOW_COMPLETED";

export const enum TodosLoadingStatus {
    Idle = "IDLE",
    Loading = "LOADING",
    Succeeded = "SUCCEEDED",
    Failed = "FAILED"
}

export interface TodosState {
    todos: Todo[],
    visibilityFilter: VisibilityFilterType,
    todosLoadingStatus: TodosLoadingStatus,
    error: string
}

const initialState: TodosState = {
    todos: [],
    visibilityFilter: "SHOW_ALL",
    todosLoadingStatus: TodosLoadingStatus.Idle,
    error: ""
};

export const fetchTodos = createAsyncThunk<
        Todo[],
        void,
        {
            rejectValue: string
        }
    >(
    "todos/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=2");

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(`An error occurred during fetching todos: ${error}`);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    'todos/addNewPost',
    async (initialTodo) => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', initialTodo);
        return response.data;
    }
);

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: {
            reducer(state, action: PayloadAction<Todo>) {
                state.todos.push(action.payload);
            },
            //"prepare callback" may run some logic and creates an action object, which will be passed to reducer
            prepare(title: string) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        completed: false
                    }
                };
            }
        },
        toggleTodo: (state, action:PayloadAction<string>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);

            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        editTodo: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);

            if (todo) {
                todo.title = action.payload.title;
            }
        },
        setVisibilityFilter: (state, action: PayloadAction<VisibilityFilterType>) => {
            state.visibilityFilter = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.todosLoadingStatus = TodosLoadingStatus.Loading;
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.todosLoadingStatus = TodosLoadingStatus.Succeeded;
                state.error = "";
                state.todos = action.payload;
            })
            // .addCase(fetchTodos.rejected, (state, action) => {
            //     state.todosLoadingStatus = TodosLoadingStatus.Failed;
            //     state.error = action.payload as string;
            // })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.todosLoadingStatus = TodosLoadingStatus.Failed;

                if (typeof(action.payload) === "string") {
                    state.error = action.payload;
                } else {
                    state.error = JSON.stringify(action.error);
                }
            })
            .addCase(addNewTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })
    }
});

export const { addTodo, toggleTodo, editTodo, setVisibilityFilter } = todosSlice.actions;

export const selectVisibleTodos = (state: RootState) => {
    const visibilityFilter = state.todos.visibilityFilter;
    const todos = state.todos.todos;

    switch (visibilityFilter) {
        case "SHOW_ALL": {
            return todos;
        }
        case "SHOW_ACTIVE": {
            return todos.filter(todo => !todo.completed);
        }
        case "SHOW_COMPLETED": {
            return todos.filter(todo => todo.completed)
        }
    }
};

export const selectVisibilityFilter = (state: RootState) => state.todos.visibilityFilter;

export default todosSlice.reducer;
