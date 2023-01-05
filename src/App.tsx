import React from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

function App() {
        const todoListTitle_1: string = "what to learn"
        const todoListTitle_2: string = "what to buy"
        const tasks_1: Array<TaskType> = [
            {id: 1,title: "HTML",isDone: true},
            {id: 2,title:"CSS",isDone: true},
            {id: 3,title:"JS/TS",isDone: false}
        ]
    return (
        <div className="App">
            <ToDoList title={todoListTitle_1} tasks={tasks_1}/>
            {/*<ToDoList title={todoListTitle_2} сделать таски/>*/}
        </div>
    );
}

export default App;
