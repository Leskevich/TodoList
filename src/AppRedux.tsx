import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TodolistType} from "./State/todolist-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";


export function AppRedux() {

    let todoLists = useSelector<AppRootStateType,TodolistType[]>((state)=>state.todolists)

    const mapTodo = todoLists.map((el) => {
        return (
            <Todolist
                key={el.id}
                idTodo={el.id}
                title={el.title}
                filter={el.filter}
            />
        )
    })
    return (
        <div className="App">
            {mapTodo}
        </div>
    );
}


