import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {filterType, taskType} from "./App";
import {Button} from "./components/Button";


type TodolistType = {
    id:string
    title: string
    tasks: taskType[]
    deleteTask: (id: string) => void
    changeFilter: (id: string, filter: filterType) => void
    addTask: (title: string) => void
}

export const Todolist = ({
    id,
                             title,
                             tasks,
                             deleteTask,
                             changeFilter,
                             addTask
                         }: TodolistType) => {


    const onDellTask = (id: string) => {
        deleteTask(id)
    }
    const changeFilterHandler = (id:string ,filter: filterType) => changeFilter(id,filter)
    const addNewTask = () => {
        if (newTitle.trim() !== '') {
            addTask(newTitle.trim())
            setNewTitle('')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask()

        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    let [newTitle, setNewTitle] = useState<string>('')
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
            <h3>{title}</h3>
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
                <Button name={'All'} collBack={() => changeFilter(id,"all")}/>
                <Button name={'Active'} collBack={() => changeFilter(id,"active")}/>
                <Button name={'Completed'} collBack={() => changeFilter(id,"completed")}/>
            </div>
        </div>
    );
};

