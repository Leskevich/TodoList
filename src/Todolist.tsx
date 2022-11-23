import React, {useState, KeyboardEvent, ChangeEvent,MouseEvent} from 'react';
import {filterType, taskType} from "./App";
import {Button} from "./components/Button";
import {EditableSpan} from "./components/EditableSpan";


type TodolistType = {
    id: string
    title: string
    tasks: taskType[]
    deleteTask: (todoId: string, id: string) => void
    changeFilter: (id: string, filter: filterType) => void
    addTask: (todoId: string, title: string) => void
    deleteTodo: (todoId: string) => void
    changeTodoTitle: (todoId: string, title: string) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    changeStatusTask: (todoId: string, taskId: string, isDone: boolean) => void
}

export const Todolist = ({
                             id,
                             title,
                             tasks,
                             deleteTask,
                             changeFilter,
                             addTask,
                             deleteTodo,
                             changeTodoTitle,
                             changeTaskTitle,
                             changeStatusTask
                         }: TodolistType) => {
    let [newTitle, setNewTitle] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)


    const onDellTask = (taskId: string) => {
        deleteTask(id, taskId)
    }
    const changeFilterHandler = (filter: filterType) => changeFilter(id, filter)
    const addNewTask = () => {
        if (newTitle.trim() !== '') {
            addTask(id, newTitle.trim())
            setNewTitle('')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask()
        }
    }
    const deleteTodoHandler = () => {
        deleteTodo(id)
    }
    const changeTaskTitleHandler = (taskId: string, title: string) => {
        changeTaskTitle(id, taskId, title)
    }
    const changeStatusTaskHandler = (e:MouseEvent<HTMLInputElement>,taskId:string) => {
        changeStatusTask(id,taskId,e.currentTarget.checked)
    }


    const tasksMap = tasks.map((el) => {
        return (
            <div key={el.id}>
                <button onClick={() => onDellTask(el.id)}>x</button>
                <input type="checkbox" checked={el.isDone} onClick={(e)=>changeStatusTaskHandler(e,el.id)}/>
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
                    changeTodoTitle(id, title)
                }}/>
            </h3>
            <div>
                <input
                    onKeyPress={onKeyPressHandler}
                    onChange={onChangeHandler}
                    value={newTitle}
                />
                <button
                    onClick={addNewTask}>+
                </button>
            </div>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <Button name={'All'} collBack={() => changeFilterHandler("all")}/>
                <Button name={'Active'} collBack={() => changeFilterHandler("active")}/>
                <Button name={'Completed'} collBack={() => changeFilterHandler("completed")}/>
            </div>
        </div>
    );
};

