import React from 'react';
import {taskType} from "./App";


type TodolistType = {
    title: string
    tasks: taskType[]
    deleteTask: (id: number) => void
    setFilterValue:(filter:string)=>void
}

export const Todolist = ({title, tasks, deleteTask,setFilterValue}: TodolistType) => {
    const tasksMap = tasks.map((el) => {
        const delTask = () => deleteTask(el.id)
        return (
            <div key={el.id}>
                <button onClick={delTask}>x</button>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </div>
        )
    })

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
                <button onClick={()=>{setFilterValue('All')}}>All</button>
                <button onClick={()=>{setFilterValue('Active')}}>Active</button>
                <button onClick={()=>{setFilterValue('Completed')}}>Completed</button>
            </div>
        </div>
    );
};

