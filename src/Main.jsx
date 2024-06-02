import {useRef, useState, useEffect } from "react"
import Task from "./Task"
import useColor from './stores/useColor'

export default function Main()
{
    const getBlueColor = useColor((state)=>{ return state.getBlueColor })
    const getPnikColor = useColor((state)=>{ return state.getPnikColor })

    const [taskValue, setTaskValue] = useState('')
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) ?? [])


    const inputRef = useRef()
    const tasksRef = useRef()

    let category = 'business'

    function chooseCategory(event)
    {
        const radioInput = event.target.closest('.category__radio')

        if(radioInput.classList.contains('personal-radio')) {
            category = 'personal'
            getPnikColor()
        }else  {
            category = 'business'
            getBlueColor()
        }

    }

    // console.log('render')

    function addTask(event)
    {
        event.preventDefault()

        const inputValue = inputRef.current.value
        inputValue ? setTasks([...tasks, {text: inputValue, category: category}]) : alert('write task')

    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks]);

    return <>
    <main>
        <div className="title-container">
            <h1 className="title__text">what's up, </h1>
            <input className="title" type='text' placeholder="your name" maxLength={30} defaultValue="" name="title" id="title" /><br />
        </div>
        <form className="todo-form">
            <label htmlFor="task">What's on your todo list</label><br/>
            <input ref={inputRef} type='text' name="task" id="task" placeholder='e.g get a milk' /><br />

            <label className="category__label">Pick a category</label>
            <div onClick={chooseCategory} className="category">
                <div className="category__block">
                    <input className="category__radio business-radio" type="radio" id="category" name="category" defaultValue="business" />
                    <label htmlFor="business">Business</label>
                </div>
                <div className="category__block">
                    <input className="category__radio personal-radio" type="radio" id="category" name="category" defaultValue="personal" />
                    <label htmlFor="personal">Personal</label>
                </div>
            </div>

            <input onClick={addTask} type="submit" id="submit__btn" defaultValue="Add Todo" />
        </form>
        <div ref={tasksRef} className="tasks">
            {tasks.map((task, index)=>
                <Task key={task.text + index} index={index} tasks={tasks} setTasks={setTasks} post={task.text} category={task.category} />
            )}
        </div>
    </main>
    </>
}