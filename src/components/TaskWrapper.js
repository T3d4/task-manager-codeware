import React, { useState } from 'react'
// import { EditTodoForm } from "./EditTodoForm";
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';


export const TaskWrapper = () => {
    let [items, setItems] = useState([]);

    const today = new Date();
    const dateString = today.toLocaleDateString("en-NG", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });


    const handleAddItem = (newTask) => {
        console.log("initial", newTask)
        newTask = newTask.trim();
        if (!newTask) {
            return;
        }

        items = [...items, {
            id: Math.random(),
            title: newTask,
            dueDate: dateString,
            isComplete: false,
            isEditing: false
        }];

        setItems(items);
    };

    const handleDeleteItem = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
    };


    const handleCompleteItem = (id) => {
        const newItems = items.map((item) => {
            if (item.id === id && item.isComplete === false) {
                item.isComplete = true
            }

            else {
                item.isComplete = false;
            }
            return item;
        });
        setItems(newItems);
    };


    const handleUpdateItem = (title, id) => {
        console.log("items", items)
        const newItems = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item, title,
                    dueDate: dateString,
                }
            }
            return item;
        });
        console.log("new item", newItems)
        setItems(newItems)
    }

    return (

        <div className='TaskWrapper'>
            <h1>To Do List</h1>
            <TodoForm handleAddItem={handleAddItem} />
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