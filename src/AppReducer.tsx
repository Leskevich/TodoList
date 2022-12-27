import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {
    changeFilterTodoAC,
    changeTitleTodoAC,
    filterType,
    RemoveTodolistAC,
    todolistReducer
} from "./State/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from "./State/task-reducer";


export type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<taskType>
}


export function AppReducer() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
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
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
//todoos
    const changeTodoTitle = (todoId: string, title: string) => {
        dispatchTodoLists(changeTitleTodoAC(todoId,title))
    }
    const deleteTodo = (todoId: string) => {
        const action = RemoveTodolistAC(todoId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const changeFilter = (id: string, filter: filterType) => {
        dispatchTodoLists(changeFilterTodoAC(id,filter))
    }

//task
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        dispatchTasks(changeTitleStatusAC(taskId,title,todoId))
    }

    const deleteTask = (todoId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(taskId,todoId))
    }
    const addTask = (todoId: string, title: string) => {
        dispatchTasks(addTaskAC(todoId,title))
    }
    const changeStatusTask = (todoId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(taskId,todoId,isDone))
    }

    const filteredTasks = (id: string, filter: filterType) => {
        switch (filter) {
            case 'active':
                return tasks[id].filter(el => el.isDone)
            case 'completed':
                return tasks[id].filter(el => !el.isDone)
            default:
                return tasks[id]
        }
    }
    const mapTodo = todoLists.map((el) => {
        return (
            <Todolist
                key={el.id}
                id={el.id}
                title={el.title}
                tasks={filteredTasks(el.id, el.filter)}
                deleteTask={deleteTask}
                addTask={addTask}
                changeFilter={changeFilter}
                deleteTodo={deleteTodo}
                changeTodoTitle={changeTodoTitle}
                changeTaskTitle={changeTaskTitle}
                changeStatusTask={changeStatusTask}
            />
        )
    })
    return (
        <div className="App">
            {mapTodo}
        </div>
    );
}


