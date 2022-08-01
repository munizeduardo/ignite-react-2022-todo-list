import { ChangeEvent, FormEvent, useState } from 'react';
import { Task } from './Task';
import { v4 as uuidv4 } from 'uuid';

import { Clipboard, PlusCircle } from 'phosphor-react';
import styles from './Tasklist.module.css';

interface TaskProps {
    id: string;
    title: string;
    isComplete: boolean;
}

function PlaceholderEmpty() {
    return (
        <div>
            <div className={styles.placeholderWrapper}>  
                <Clipboard size={56}/>

                <div className={styles.placeholderText}>
                    <strong>No tasks created</strong>
                    <span>Create tasks and organize your to-do list!</span>
                </div>
            </div>
        </div>
    )
}

export function TaskList() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const tasksCounter = tasks.length;
    const completedTasks = tasks.filter(task => task.isComplete === true).length;

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        if(!newTitle) return;

        const newTask = {
            id: uuidv4(),
            title: newTitle,
            isComplete: false
        }

        setTasks([...tasks, newTask]);
        setNewTitle('');
    }

    function handleNewTitleChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setNewTitle(event.target.value);
    }

    function toggleIsComplete(id: string) {
        const selectedTask = tasks.map(task => task.id === id ? {
            ...task,
            isComplete: !task.isComplete
        } : task);

        setTasks(selectedTask);
    }

    function deleteTask(id: string) {
        setTasks(tasks.filter(task => task.id != id));
    }

    return (
        <div className={styles.mainContainer}>
            <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
                <input 
                    name='task'
                    placeholder='Add a new task'
                    autoComplete='off'
                    value={newTitle}
                    onChange={handleNewTitleChange}
                    required
                />
                
                <button type="submit">
                    Create
                    <PlusCircle />
                </button>
            </form>

            <div className={styles.tasksDisplay}>
                <div className={styles.tasksStatus}>
                    <div className={styles.totalCreatedTasks}>
                        <p>Created tasks</p>
                        <span>{tasksCounter}</span>
                    </div>

                    <div className={styles.totalCompletedTasks}>
                        <p>Completed tasks</p>
                        <span>{completedTasks} of {tasksCounter}</span>
                    </div>
                </div>
                
                <div className={styles.tasks}>
                    {!tasksCounter && (
                        <PlaceholderEmpty />     
                    )}

                    <ul>
                        {tasks.map(task => (
                            <li className={styles.createdTask} key={task.id}>
                                <Task 
                                    id={task.id}
                                    title={task.title}
                                    isComplete={task.isComplete}
                                    onDeleteTask={deleteTask}
                                    onToggleCompletion={toggleIsComplete}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}