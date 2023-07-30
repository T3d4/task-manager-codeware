import React, { useState } from 'react'
// import { EditTodoForm } from "./EditTodoForm";
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
// import { TodoModal } from './TodoModal';


export const TaskWrapper = () => {
    let [items, setItems] = useState([]);

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



    return (

        <div className='TaskWrapper'>
            <h1>To Do List</h1>
            {/* <TodoModal /> */}
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