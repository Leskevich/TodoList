import {v1} from "uuid";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";


let todolistID1 = v1();
let todolistID2 = v1();
export type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<taskType>
}
const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(e => e.id != action.payload.taskId)
            }
        case "ADD-TASK":
            const newTask: taskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {...state, [action.payload.todoId]: [...state[action.payload.todoId], newTask]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todoId]: [...state[action.payload.todoId]
                    .map(e => e.id === action.payload.taskId ? {...e, isDone: action.payload.isDone} : e)]
            }
        case "CHANGE-TITLE-STATUS":
            return {
                ...state,
                [action.payload.todoId]: [...state[action.payload.todoId]
                    .map(e => e.id === action.payload.taskId ? {...e, title: action.payload.title} : e)]
            }
        case "ADD-TODO":
            return {
                ...state, [action.todoId]: []
            }
        case "REMOVE-TODOLIST":
            const newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
};


type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTitleStatusAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>


export const removeTaskAC = (todoId: string,taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoId,
            taskId,
        }
    } as const
}
export const addTaskAC = (title: string, todoId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoId,
            title,
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string,todoId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoId,
            taskId,
            isDone,
        }
    } as const
}
export const changeTitleStatusAC = (taskId: string, title: string, todoId: string) => {
    return {
        type: 'CHANGE-TITLE-STATUS',
        payload: {
            todoId,
            taskId,
            title,
        }
    } as const
}

