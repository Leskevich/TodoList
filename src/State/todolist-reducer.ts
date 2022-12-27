import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: filterType
}

const initialState: TodolistType[] = [
    {id: v1(), title: 'What to learn', filter: 'all'},
    {id: v1(), title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state: TodolistType[] = initialState, action: ActionTypeTodo): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODO":
            const newTodo: TodolistType = {
                id: action.todoId,
                title: action.title,
                filter: 'active'
            }
            return [...state, newTodo]
        case "REMOVE-TODOLIST":
            return state.filter(e => e.id !== action.id)
        case "CHANGE-TODOLIST-TITLE":
            return state.map((e: TodolistType) => e.id === action.id ? {...e, title: action.title} : e)
        case "CHANGE-TODOLIST-FILTER":
            return state.map((e: TodolistType) => e.id === action.id ? {...e, filter: action.filter} : e)
        default:
            return state
    }
};


export type ActionTypeTodo =
    ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof changeTitleTodoAC>
    | ReturnType<typeof changeFilterTodoAC>



export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODO',
        title,
        todoId: v1()
    } as const
}
export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}
export const changeTitleTodoAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    } as const
}
export const changeFilterTodoAC = (id: string, filter: filterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter,
    } as const
}

