import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
    changeTaskTitle: (taskId: string,title: string, todoListId: string) => void
    changeTodoListTitle: (title:string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList:React.FC<TodoListPropsType>= (props) => {

    let tasksList = props.tasks.length
        ? props.tasks.map((task) => {


            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const changeTaskTitle = (title: string) => {props.changeTaskTitle(task.id, title, props.todoListId)}
            const taskClasses = task.isDone ? 'task-done' : 'task'


            return (
                <li key={task.id} className={taskClasses}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={task.isDone}/>
                    {/*<span>{task.title}</span>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your tasks list is empty</span>



    const addTask = (title: string) => {
        props.addTask(title,props.todoListId )
    }


    const removeTodoList = () => {props.removeTodoList(props.todoListId)}
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(title, props.todoListId)


        return (
            <div>
                <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <button onClick={removeTodoList}>x</button>
                </h3>
                <AddItemForm addItem={addTask}/>
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
        )
}
export default TodoList;