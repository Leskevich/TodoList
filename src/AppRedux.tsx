import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddTodolistAC, TodolistType} from "./State/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import {AddItemForm} from "./components/AddItemForm";


export function AppRedux() {

    let todoLists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
    const dispatch = useDispatch()
    const addTodo = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch])

    const mapTodo = todoLists.map((el) => {
        return (
            <div className="Todo"
                 key={el.id}
            >
                <Todolist
                    idTodo={el.id}
                    title={el.title}
                    filter={el.filter}
                />
            </div>

        )
    })
    return (
        <div className="App">
            <AddItemForm callback={(title: string) => addTodo(title)}/>
            <div>
                {mapTodo}
            </div>

        </div>
    );
}


