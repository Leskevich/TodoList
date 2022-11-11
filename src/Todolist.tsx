import React from 'react';
import {taskType} from "./App";


type TodolistType = {
    title: string
    tasks: taskType[]
    deleteTask: (id: number) => void
    setFilterValue: (filter: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             deleteTask,
                             setFilterValue
                         }: TodolistType) => {
    const tasksMap = tasks.map((el) => {
        const delTask = () => deleteTask(el.id)
        return (
            <div key={el.id}>
                <button onClick={()=>delTask()}>x</button>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </div>
        )
    })
    const setFilter = (filter: string)  => setFilterValue(filter)

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <button onClick={()=>setFilter("All")}>All</button>
                <button onClick={()=>setFilter("Active")}>Active</button>
                <button onClick={()=>setFilter("Completed")}>Completed</button>
            </div>
        </div>
    );
};

