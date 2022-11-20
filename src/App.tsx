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
export type TasksType = {
    [key: string]: Array<taskType>
}
export type filterType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const deleteTodo = (todoId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoId))
        delete tasks[todoId]

    }


    const changeFilter = (id: string, filter: filterType) => {
        return setTodoLists(todoLists.map((el) => el.id === id ? {...el, filter} : el))
    }
    const filteredTasks = (id: string, filter: filterType) => {
        switch (filter) {
            case 'active':
                return tasks[id].filter(el => el.isDone)
            case 'completed':
                return tasks[id].filter(el => !el.isDone)
            default:
                return tasks[id]
        }
    }
    const deleteTask = (todoId: string, id: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== id)})
    }
    const addTask = (todoId: string, title: string) => {
        const newTask: taskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }
    const mapTodo = todoLists.map((el) => {
        return (
            <Todolist
                key={el.id}
                id={el.id}
                title={el.title}
                tasks={filteredTasks(el.id, el.filter)}
                deleteTask={deleteTask}
                addTask={addTask}
                changeFilter={changeFilter}
                deleteTodo={deleteTodo}
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
