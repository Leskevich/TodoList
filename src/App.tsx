import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type taskType = {
    id: number
    title: string
    isDone: boolean
}


function App() {
    const title = 'What to learn'
    const [filterValue,setFilterValue]=useState('All')
    const [tasks, setTask] = useState<Array<taskType>>([
        {id: 1, title: "html", isDone: false},
        {id: 2, title: "css", isDone: false},
        {id: 3, title: "react", isDone: true},
        {id: 4, title: "redux", isDone: false},
    ])

    const deleteTask = (id: number) => {
        setTask(tasks.filter((el: taskType) => el.id !== id))
    }
    let afterFilterTasks = tasks
    if (filterValue === 'Active') {
        afterFilterTasks = tasks.filter(el=>el.isDone)
    }
    if (filterValue === 'Completed') {
        afterFilterTasks = tasks.filter(el=>!el.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={afterFilterTasks}
                deleteTask={deleteTask}
                setFilterValue={setFilterValue}
            />

        </div>
    );
}

export default App;
