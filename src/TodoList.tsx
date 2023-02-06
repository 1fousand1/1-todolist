import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";


export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask:(title:string, todoListId: string) => void
    changeTaskStatus: (taskId:string, isDone:boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    let tasksList = props.tasks.length
    ? props.tasks.map((task) => {
            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const taskClasses = task.isDone ? 'task-done' : 'task'
            return (
                <li key={task.id} className={taskClasses}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your tasks list is empty</span>


    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(title, props.todoListId)
        } else {
            setError(true)
        }
        setTitle('')
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const removeTodoList = () => {props.removeTodoList(props.todoListId)


        const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

        const errorMessage = error && <p style={{color: 'red', fontWeight: 'bold', margin: '0'}}> Title is required</p>
        const inputErrorClass = error ? 'input-error' : ''


        return (
            <div>
                <h3>{props.title}
                    <button onClick={removeTodoList}>x</button>
                </h3>
                <div>
                    <input
                        type='text'
                        value={title}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        className={inputErrorClass}/>

                    <button onClick={addTask}>+</button>
                    {errorMessage}
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'btn-active' : ''}
                        onClick={handlerCreator('all')}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'btn-active' : ''}
                        onClick={handlerCreator('active')}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'btn-active' : ''}
                        onClick={handlerCreator("completed")}>Completed
                    </button>
                </div>
            </div>
        )}
}
export default TodoList;