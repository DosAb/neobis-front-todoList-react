import {useRef, useState, useEffect } from "react"

export default function Task({post, category, setTasks, index, tasks})
{
    const taskInputRef = useRef()

    function editButton(event)
    {
        const taskContainer = event.target.closest('.task-container')
        const taskInput = taskContainer.querySelector('.task-result')
        taskInput.disabled = false
    }
    function deleteButton(event)
    {
        const deletedTasks = tasks.filter((item, i) =>  i !== index)
        setTasks(deletedTasks)
    }

    function completeTask(event)
    {
        taskInputRef.current.checked = !taskInputRef.current.checked
        taskInputRef.current.checked == true ? taskInputRef.current.style.textDecoration = 'line-through' : taskInputRef.current.style.textDecoration = 'none'  
    }

    return <>
        <div className="task-container" >
            <input onClick={completeTask} type="checkbox" className={`task-complete ${category == 'business' ? 'checkbox-blue' : 'checkbox-pink'}`} />
            <input ref={taskInputRef} value={post} checked={false} className="task-result" disabled={true} style={{boxShadow: 'inset'}} />
            <button onClick={editButton} className="edit">edit</button>
            <button onClick={deleteButton} className="delete">delete</button>
        </div>
    </>
}