import React from 'react';
import { TodoModal } from './TodoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


export const Todo = ({ items, handleDeleteItem, handleCompleteItem, handleUpdateItem }) => {
    const [show, setShow] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null);

    const handleUpdateIconClick = (item) => {
        setSelectedTask(item);
        setShow(true);
    };

    return (
        <table className='table-container'>
            <thead>
                <tr>
                    <th>Task Description</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th className='btn-action'>Actions</th>
                </tr>
            </thead>
            <tbody>

                {items.map((item) => (

                    <tr key={item.id} >

                        <td className={` table-text ${item.isComplete ? 'completed' : ''}`}>{item.title}
                            <FontAwesomeIcon icon={faPenToSquare} className='update-btn'
                                onClick={() => {
                                    setShow(true)
                                    handleUpdateIconClick(item)
                                }} />
                            <TodoModal
                                key={item.id}
                                item={item}
                                title={item.title}
                                setShow={setShow}
                                show={show}
                                handleUpdateItem={handleUpdateItem}
                                selectedTask={selectedTask}
                            />
                        </td>

                        <td className='status'>{item.isComplete ? "Completed" : "Pending"}</td>
                        <td>{item.dueDate}</td>
                        <td className='actions'>
                            {item.isComplete ? <FontAwesomeIcon icon={faCheck} onClick={() => handleCompleteItem(item.id)} className="done" /> : <FontAwesomeIcon icon={faClock} onClick={() => handleCompleteItem(item.id)} className="pending" />}
                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteItem(item.id)} className="delete-btn" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}
