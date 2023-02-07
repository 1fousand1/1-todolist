import React, {useEffect, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import todoList, {TaskType} from "./TodoList";
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title:string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "WHISKEY", isDone: true},
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "ACE", isDone: false},
        ],
    })

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        const updatedTodoLists = todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: filter} : tl)
        setTodoLists(updatedTodoLists)
    }

    const changeTodoListTitle = (title: string, todoListId: string) =>{
        const updatedTodoLists = todoLists.map((tl) => tl.id === todoListId ? {...tl, title:title} : tl)
        setTodoLists(updatedTodoLists)
    }
    const removeTodoList = (todoListId: string) =>{
        setTodoLists(todoLists.filter(tl=> tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }


    const addTodoList = (title:string) => {
        const newTodoListId = v1()
        const newTodo: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks,[newTodoListId]:[]})
    }

    const removeTask = (taskId: string, todoListId: string) => {
        const updatedTasks = tasks[todoListId].filter(task => task.id !== taskId)
        setTasks({...tasks,[todoListId]: updatedTasks})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({...tasks,[todoListId]: [...tasks[todoListId], newTask]})


    }
    const changeTaskStatus = (taskId: string, isDone:boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map((t) => t.id === taskId ? {...t, isDone: !t.isDone} : t)})
    }
    const changeTaskTitle = (taskId: string,title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map((t) => t.id === taskId ? {...t, title: title} : t)}) }

    //utility:
    const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case 'active':
                    return tasks.filter(task => task.isDone === false)
                case 'completed':
                    return tasks.filter(task => task.isDone === true)
                default:
                    return tasks
            }

        }

    const todoListComponents = todoList.length ?
        todoLists.map((tl)=>{
        const filteredTasksForRender = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <TodoList
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                filter={tl.filter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList ={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
        })
            : <span> Create your first todolist</span>

    {
        return (
            <div className="App">
                <AddItemForm addItem={addTodoList}/>
                {todoListComponents}
            </div>
        );
    }
}

export default App;
