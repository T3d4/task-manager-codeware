import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import io from 'socket.io-client'

export const TaskWrapper = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const socket = io();
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/v1/tasks');
                const datum = response.data
                const data = datum.map((item) => {
                    const date = new Date(item.dateCreated);
                    const formatDate = date.toISOString().split('T')[0];
                    return { ...item, dateCreated: formatDate }

                })
                console.log(data)
                setItems(data);
            }
            catch (error) {
                console.error(`error: ${error}`);
            }
        };
        socket.on('update', () => {
            console.log('Received updateTask event');
            fetchTasks();
        });
        socket.on('connection', () => fetchTasks());
        return () => {
            socket.disconnect(); // Disconnect when the component unmounts
        };
    }
        , [])

    const dateString = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateFormat = `${year}-${month}-${day}`;
        return dateFormat
    }




    const handleAddItem = async (newTask) => {
        newTask = newTask.trim();
        if (!newTask) {
            return;
        }
        // Update the content of the original array(items)
        const itemObject = {
            title: newTask,
            dateCreated: dateString(),
            isComplete: false
        }
        const addTask = async () => {
            try {
                await axios.post('/api/v1/tasks', itemObject);
            } catch (error) {
                console.log(`error: ${error}`);
            }
        }
        addTask();
    };

    const handleDeleteItem = async (id) => {
        try {
            if (id !== undefined) {
                setItems((items) => items.filter((task) => task.id !== id));
                await axios.delete(`/api/v1/tasks/${id}`);
            }
        }
        catch (error) {
            console.log(`error:::${error}`);
        }
    }

    const handleCompleteItem = async (id) => {
        try {
            const updatedItems = items.map(currentItem =>
                currentItem.id === id ? {
                    ...currentItem,
                    isComplete: !currentItem.isComplete
                } : currentItem);
            const updatedItem = updatedItems.find(item => item.id === id);
            await axios.patch(`/api/v1/tasks/${id}`, {
                isComplete: updatedItem.isComplete
            })
        } catch (error) {
            console.log(`error::: ${error}`)
        }
    }

    const handleUpdateItem = async (title, id) => {
        try {
            const newItems = items.map((item) =>
                item.id === id ? { ...item, title, } : item);
            const updateItem = newItems.find(item => item.id === id)
            await axios.patch(`/api/v1/tasks/${id}`, {
                title: updateItem.title
            })
        } catch (error) {
            console.log(`error:::${error}`);
        }
    }

    return (


        <div className='TaskWrapper'>

            <h1>To Do List</h1>
            <TodoForm
                handleAddItem={handleAddItem}
            />
            <div>
                <Todo
                    items={items}
                    handleUpdateItem={handleUpdateItem}
                    handleDeleteItem={handleDeleteItem}
                    handleCompleteItem={handleCompleteItem} />
            </div>
        </div>

    );
};