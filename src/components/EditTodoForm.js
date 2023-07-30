import React, { useState } from 'react'

export const TodoForm = ({ handleAddItem, items }) => {
    const [value, setNewTask] = useState(items.item);

    const handleInputChange = (event) => {
        event.preventDefault()
        setNewTask(event.target.value);
    };
    return (
        <form className="TodoForm">
            <input type="text" value={value} onChange={handleInputChange} className="todo-input" placeholder='Update Task' />
            <button type="submit" className='todo-btn'>Add Task</button>
        </form>
    )
}