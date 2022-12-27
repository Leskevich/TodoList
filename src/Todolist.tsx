import React, {ChangeEvent} from 'react';
import {filterType, taskType} from "./App";
import {Button} from "./components/Button";
import {EditableSpan} from "./components/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from "./State/task-reducer";
import {AppRootStateType} from "./State/store";
import {changeFilterTodoAC, changeTitleTodoAC, RemoveTodolistAC} from "./State/todolist-reducer";
import {AddItemForm} from "./components/AddItemForm";


type TodolistType = {
    idTodo: string
    title: string
    filter: filterType
}

export const Todolist = ({
                             idTodo,
                             title,
                             filter,
                         }: TodolistType) => {
    let tasks = useSelector<AppRootStateType, taskType[]>(state => state.tasks[idTodo])
    const dispatch = useDispatch()


    const onDellTask = (taskId: string) => {
        dispatch(removeTaskAC(taskId, idTodo))
    }
    const changeFilter = (filter: filterType) => {
        dispatch(changeFilterTodoAC(idTodo, filter))
    }
    const addNewTask = (title: string) => dispatch(addTaskAC(idTodo, title))

    const deleteTodoHandler = () => {
        dispatch(RemoveTodolistAC(idTodo))
    }
    const changeTaskTitleHandler = (taskId: string, title: string) => {
        dispatch(changeTitleStatusAC(taskId, title, idTodo))
        // changeTaskTitle(id, taskId, title)
    }
    const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        dispatch(changeTaskStatusAC(taskId, idTodo, e.currentTarget.checked))
    }

    const filteredTasks = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(el => el.isDone)
            case 'completed':
                return tasks.filter(el => !el.isDone)
            default:
                return tasks
        }
    }
    const tasksF = filteredTasks().map((el) => {
        return (
            <div key={el.id}>
                <button onClick={() => onDellTask(el.id)}>x</button>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={(e) => changeStatusTaskHandler(e, el.id)}
                />
                <EditableSpan oldTitle={el.title} callback={(title: string) => {
                    changeTaskTitleHandler(el.id, title)
                }}/>
            </div>
        )
    })


    return (
        <div>
            <h3>

                <button onClick={deleteTodoHandler}> x</button>
                <EditableSpan oldTitle={title} callback={(title: string) => {
                    dispatch(changeTitleTodoAC(idTodo, title))
                }}/>
            </h3>
            <div>
                <AddItemForm callback={(title: string) => addNewTask(title)}/>
            </div>
            <ul>
                {tasksF}
            </ul>
            <div>
                <Button name={'All'} collBack={() => changeFilter("all")}/>
                <Button name={'Active'} collBack={() => changeFilter("active")}/>
                <Button name={'Completed'} collBack={() => changeFilter("completed")}/>
            </div>
        </div>
    );
};

