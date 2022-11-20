import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {filterType, taskType} from "./App";
import {Button} from "./components/Button";


type TodolistType = {
    id: string
    title: string
    tasks: taskType[]
    deleteTask: (todoId: string, id: string) => void
    changeFilter: (id: string, filter: filterType) => void
    addTask: (todoId: string, title: string) => void
    deleteTodo: (todoId: string) => void
}

export const Todolist = ({
                             id,
                             title,
                             tasks,
                             deleteTask,
                             changeFilter,
                             addTask,
                             deleteTodo
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


    const tasksMap = tasks.map((el) => {
        return (
            <div key={el.id}>
                <button onClick={() => onDellTask(el.id)}>x</button>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </div>
        )
    })


    return (
        <div>
            <h3>
                <button onClick={deleteTodoHandler}> x</button>
                {title}

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

