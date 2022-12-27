import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})


export const store = legacy_createStore(rootReducer)
export type AppRootStateType=ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store