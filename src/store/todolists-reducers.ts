import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistAT ={
    type: "REMOVE-TODOLIST"
    payload:{
        todolistId: string
    }

}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
    }
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: {title: string,
        todolistId: string
    }
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        filter: FilterValuesType,
        todolistId: string
    }
}

type ActionType = RemoveTodolistAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType):  Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter((tl) => tl.id !== action.payload.todolistId)

        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newTodo: TodoListType = {
                id: newTodoListId,
                title: action.payload.title,
                filter: "all"
            }
            return [...todolists, newTodo]

        case "CHANGE-TODOLIST-FILTER":
            return todolists.map((tl) => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

        case "CHANGE-TODOLIST-TITLE":
            return todolists.map((tl) => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)

        default:
            return todolists
    }


}

export const RemoveTodoListAC = (id: string): RemoveTodolistAT => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId: id
        }
    }
}

export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title
        }
    }
}

export const ChangeTodoListTitleAC = (id:string , title: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title: title,
            todolistId: id

        }
    }
}
export const ChangeTodoListFilterAC = (id:string , filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            filter: filter,
            todolistId: id

        }
    }
}