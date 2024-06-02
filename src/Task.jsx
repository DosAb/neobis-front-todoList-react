export default function Task({post, category, setTasks, index, tasks})
{

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

    return <>
        <div className="task-container" >
            <input type="checkbox" className={`task-complete ${category == 'business' ? 'checkbox-blue' : 'checkbox-pink'}`} />
            <input value={post} className="task-result" disabled={true} style={{boxShadow: 'inset'}} />
            <button onClick={editButton} className="edit">edit</button>
            <button onClick={deleteButton} className="delete">delete</button>
        </div>
    </>
}