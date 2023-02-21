import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Typography from '@mui/material/Typography';


export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList: React.FC<TodoListPropsType> = (props) => {

    let tasksList = props.tasks.length
        ? props.tasks.map((task) => {


            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            const taskClasses = ['task']
            task.isDone && taskClasses.push('done')
            /*task.isDone ? 'task-done' : 'task'*/

            return (
                <li key={task.id} className={'tasks-list-item'}>
                    <div className={taskClasses.join(' ')}>
                        <Checkbox onChange={changeTaskStatus}
                            /*type="checkbox"*/
                                  checked={task.isDone}/>
                        {/*<input
                            onChange={changeTaskStatus}
                            type="checkbox"
                            checked={task.isDone}/>*/}
                        {/*<span>{task.title}</span>*/}
                        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    </div>

                    {/*<button onClick={removeTask}>x</button>*/}
                    <IconButton onClick={removeTask} size={"small"}>
                        <DeleteForeverRoundedIcon/>
                    </IconButton>
                </li>
            )
        })
        : <span>Your tasks list is empty</span>


    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }


    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)


    return (
        <div>
            <Typography align="center" variant="h5" fontWeight="bold">
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton onClick={removeTodoList} size={"small"}>
                    <DeleteForeverRoundedIcon/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <List className={'tasks-list'}>
                {tasksList}
            </List>
            <div>
                <Button
                    sx={{mr: "20px"}}
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={handlerCreator('all')}>All
                </Button>
                <Button
                    sx={{mr: "20px"}}
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={handlerCreator('active')}>Active
                </Button>
                <Button

                    size={'small'}
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    disableElevation
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={handlerCreator("completed")}>Completed
                </Button>
            </div>
        </div>
    )
}
export default TodoList;