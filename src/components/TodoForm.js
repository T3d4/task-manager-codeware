import React, { useState } from 'react'

export const TodoForm = ({ handleAddItem }) => {

    const [newTask, setNewTask] = useState('')

    const handleInputChange = (event) => {
        event.preventDefault()
        if (newTask) {
            handleAddItem(newTask)
            setNewTask('')
        }

    };

    return (

        <div>
            <form onSubmit={handleInputChange}>
                <input
                    className='task-input'
                    type="text"
                    autoFocus
                    placeholder="Enter new task..."
                    value={newTask}
                    onChange={(e) => { setNewTask(e.target.value) }}
                />
                <button type='submit'>Add Item</button>
            </form>
        </div>
    )
}
