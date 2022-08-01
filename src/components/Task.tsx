import { Trash } from 'phosphor-react'

import styles from './Task.module.css';

interface TaskProps {
    id: string;
    title: string;
    isComplete: boolean;
    onDeleteTask: (task: string) => void;
    onToggleCompletion: (task: string) => void;
}

export function Task({ id, title, isComplete, onDeleteTask, onToggleCompletion }: TaskProps) {
    function handleDeleteTask() {
        onDeleteTask(id)
    }

    function handleToggleIsComplete() {
        onToggleCompletion(id)
    }

    return (
        <div className={styles.taskWrapper}>
            <div className={styles.checkboxWrapper}>
                <input
                    id={id}
                    type='checkbox'
                    onClick={() => handleToggleIsComplete()}
                />
                <label htmlFor={id} />
            </div>
            

            <p className={isComplete ? styles.taskTextDone : styles.taskText}>{title}</p>

            <button onClick={handleDeleteTask}>
                <Trash size={24} />
            </button>
        </div>
    )
}
