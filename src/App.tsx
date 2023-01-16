import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle_1: string = "what to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false}
    ])


    const [filter, setFilter] = useState<FilterValuesType>('completed')

/*
    useEffect(() => {
        console.log(tasks)
    }, [filter])
*/

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id ! == taskId))
        //console.log(tasks)
    }
    const addTask = (title: string) =>{
        const newTask: TaskType ={
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask])

    }


    const getFilteredTasksForRender =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case 'active':
                    return tasks.filter(task => task.isDone === false)
                case 'completed':
                    return tasks.filter(task => task.isDone === true)
                default:
                    return tasks
            }

        }
    const filteredTasksForRender = getFilteredTasksForRender(tasks, filter)
    return (
        <div className="App">
            <TodoList title={todoListTitle_1}
                      tasks={filteredTasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;
