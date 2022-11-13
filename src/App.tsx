import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type taskType = {
    id: string
    title: string
    isDone: boolean
}

export type filterType = 'All' | 'Active' | 'Completed'

function App() {
    const title = 'What to learn'
    const [filterValue, setFilterValue] = useState<filterType>('All')
    const [tasks, setTask] = useState<Array<taskType>>([
        {id: v1(), title: "html", isDone: false},
        {id: v1(), title: "css", isDone: false},
        {id: v1(), title: "react", isDone: true},
        {id: v1(), title: "redux", isDone: false},
    ])

    const filteredTasks = (filter: filterType) => {
        let afterFilterTasks = tasks
        switch (filter) {
            case 'Active':
                return afterFilterTasks.filter(el => el.isDone)
            case 'Completed':
                return afterFilterTasks.filter(el => !el.isDone)
            default:
                return afterFilterTasks
        }

    }
    const deleteTask = (id: string) => {
        setTask(tasks.filter((el: taskType) => el.id !== id))
    }
    const addTask =(title:string)=>{
        const newTask:taskType={
            id:v1(),
            title:title,
            isDone:false
        }
        setTask([newTask,...tasks])
    }
    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={filteredTasks(filterValue)}
                setFilterValue={setFilterValue}
                deleteTask={deleteTask}
                addTask={addTask}
            />

        </div>
    );
}

export default App;
