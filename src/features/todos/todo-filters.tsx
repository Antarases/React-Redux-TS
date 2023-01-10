import React, { FC } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { setVisibilityFilter, selectVisibilityFilter } from "./todosSlice";
import { VisibilityFilterType } from "./todosSlice";

interface FilterLinkProps {
    filter: VisibilityFilterType,
    children: React.ReactNode
}

const FilterLink: FC<FilterLinkProps> = ({ filter, children }) => {

    const currentFilter = useAppSelector(selectVisibilityFilter);
    const dispatch = useAppDispatch();

    const handleFilterClick = () => {
        dispatch(setVisibilityFilter(filter));
    }

    if (filter === currentFilter) {
        return <span>{ children }</span>
    }

    return (
        <a
            href="#"
            onClick={e => {
                e.preventDefault();

                handleFilterClick();
            }}
        >
            { children }
        </a>
    );
}

const TodoFilters = () => (
    <p>
        Show:
        {" "}
        <FilterLink filter="SHOW_ALL">
            All
        </FilterLink>
        {" "}
        <FilterLink filter="SHOW_ACTIVE">
            Active
        </FilterLink>
        {" "}
        <FilterLink filter="SHOW_COMPLETED">
            Completed
        </FilterLink>
    </p>
);

export default TodoFilters;
