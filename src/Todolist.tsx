import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {filterType, taskType} from "./App";
import {Button} from "./components/Button";


type TodolistType = {
    title: string
    tasks: taskType[]
    deleteTask: (id: string) => void
    setFilterValue: (filter: filterType) => void
    addTask: (title: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             deleteTask,
                             setFilterValue,
                             addTask
                         }: TodolistType) => {


    const onDellTask = (id:string) => {
        deleteTask(id)
    }
    const setFilter = (filter: filterType) => setFilterValue(filter)
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
                <Button name={'+'} collBack={addNewTask}/>
                <button
                    onClick={addNewTask}>+
                </button>
            </div>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <Button name={'All'} collBack={() => setFilter("All")}/>
                <Button name={'Active'} collBack={() => setFilter("Active")}/>
                <Button name={'Completed'} collBack={() => setFilter("Completed")}/>
            </div>
        </div>
    );
};

