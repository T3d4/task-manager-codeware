import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'



export const TaskWrapper = () => {
    let [items, setItems] = useState([
        {
            id: 1,
            title: 'Buy groceries',
            dueDate: Date(),
            isComplete: false,
        },
        {
            id: 2,
            title: 'Clean the house',
            dueDate: '2023-07-27',
            isComplete: false,
        },
        {
            id: 3,
            title: 'Go to the gym',
            dueDate: '2023-07-28',
            isComplete: false,
        },
    ]);

    let [newTask, setNewTask] = useState('');

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleUpdateItem = (id, newTitle, newDueDate) => {
        const newItems = items.map((item) => {
            if (item.id === id) {
                item.title = newTitle;
                item.dueDate = newDueDate;
            }
            return item;
        });
        setItems(newItems);
    };


    const handleAddItem = () => {
        newTask = newTask.trim();
        if (!newTask) {
            return;
        }

        items = [...items, {
            id: Math.random(),
            title: newTask,
            dueDate: '',
            isComplete: false,
        }];

        setItems(items);
        setNewTask('');
    };

    const handleDeleteItem = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
    };

    const handleCompleteItem = (id) => {
        const newItems = items.map((item) => {
            if (item.id === id) {
                item.isComplete = true;
            }
            return item;
        });
        setItems(newItems);
    };

    return (
        <div className='TaskWrapper'>
            <h1>To Do List</h1>
            <input
                className='task-input'
                type="text"
                placeholder="Enter new item"
                value={newTask}
                onChange={handleInputChange}
            />
            <button onClick={handleAddItem}>Add Item</button>
            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} >
                            {/* <td>{item.id}</td> */}
                            <td>{item.title} <FontAwesomeIcon icon={faPenToSquare} className='update-btn' onClick={() => handleUpdateItem(item.id, 'New Title', '2023-07-30')} /></td>
                            <td>{item.isComplete ? 'Yes' : 'No'}</td>
                            <td>{item.dueDate}</td>
                            <td className='actions'>
                                <FontAwesomeIcon icon={faCheck} onClick={() => handleCompleteItem(item.id)} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteItem(item.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};