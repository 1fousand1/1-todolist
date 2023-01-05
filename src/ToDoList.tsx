import React from 'react';

type toDolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


const ToDoList = (props: toDolistPropsType) => {
    let tasksList;
    if(props.tasks.length === 0){
        tasksList = <span>Your tasklist is empty</span>

    } else {
        tasksList = props.tasks.map((task:TaskType) => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>
            )
        })
    }


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;