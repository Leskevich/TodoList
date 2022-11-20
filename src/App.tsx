import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TodoType = {
    id: string
    title: string
    filter: filterType
}
export type taskType = {
    id: string
    title: string
    isDone: boolean
}

export type filterType = 'all' | 'active' | 'completed'

function App() {

    const [todoLists, setTodoLists] = useState<Array<TodoType>>([
        {id: v1(), title: 'what to learn', filter: 'all'},
        {id: v1(), title: 'what to by', filter: 'all'},
    ])

    const [tasks, setTask] = useState<Array<taskType>>([
        {id: v1(), title: "html", isDone: false},
        {id: v1(), title: "css", isDone: false},
        {id: v1(), title: "react", isDone: true},
        {id: v1(), title: "redux", isDone: false},
    ])


    const changeFilter = (id: string, filter: filterType) => {
        return setTodoLists(todoLists.map((el) => el.id === id ? {...el,filter} : el))
    }
    const filteredTasks = (filter: filterType) => {

        switch (filter) {
            case 'active':
                return tasks.filter(el => el.isDone)
            case 'completed':
                return tasks.filter(el => !el.isDone)
            default:
                return tasks
        }
    }
    const deleteTask = (id: string) => {
        setTask(tasks.filter((el: taskType) => el.id !== id))
    }
    const addTask = (title: string) => {
        const newTask: taskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTask([newTask, ...tasks])
    }
    const mapTodo = todoLists.map((el) => {
        return (
            <Todolist
                key={el.id}
                id={el.id}
                title={el.title}
                tasks={filteredTasks(el.filter)}
                deleteTask={deleteTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        )
    })
    return (
        <div className="App">
            {mapTodo}

        </div>
    );
}

export default App;
