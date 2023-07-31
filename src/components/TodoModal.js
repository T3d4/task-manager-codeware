import React, { useState, useEffect } from 'react';

export const TodoModal = ({ item, handleUpdateItem, show, title, setShow, selectedTask }) => {

    const [newTask, setNewTask] = useState(title)

    useEffect(() => {
        // Set the newTask state to the selected task whenever it changes
        setNewTask(selectedTask ? selectedTask.title : title);
    }, [selectedTask, title]);

    if (!show) {
        return null
    }

    console.log("outside", item, newTask, item.id)

    const handleInputChange = (event) => {
        event.preventDefault();
        handleUpdateItem(newTask, item.id)
        setNewTask('');
    };





    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header' >
                    <div className='modal-body'>
                        <form onSubmit={(event) => {
                            handleInputChange(event)
                            return setShow(false)
                        }}>
                            <input
                                type="text"
                                value={newTask}
                                autoFocus
                                onChange={(e) => { setNewTask(e.target.value) }}
                                className="modal-task-input"
                                placeholder='Update Task' />
                            <button type="submit" className='modal-footer'>Update Task</button>
                        </form>
                    </div>
                    <div className='modal-footer'>
                        {/* <button className='modal-footer'>
                        Close
                    </button> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

