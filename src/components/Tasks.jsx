import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format'
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}

const AddTask = ({ onCancel, onAddTask }) => {
    const [task, setTask] = useState("")
    const [date, setDate] = useState(null);
    return (
        <div className="add-task-dialog">
            <input value={task} onChange={(event) => setTask(event.target.value)} />
            <div className="add-tasks-action-container">
                <div className="btns-container">
                    <button
                        disabled={!task}
                        onClick={() => {
                            onAddTask(task, date);
                            setTask("");
                            onCancel()
                        }}
                        className="btn btn-primary btn-sm gap">Add Task</button>
                    <button className="btn btn-default btn-sm gap" onClick={() => onCancel()}>Cancel</button>
                </div>
                <div className="icon-container">
                    <DayPickerInput onDayChange={(day) => setDate(day)} placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        formatDate={formatDate}
                        format={FORMAT}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }]
                            }
                        }} />
                </div>
            </div>
        </div >
    )
}


const TASK_HEADER_MAPPTING = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 Days"
}

const TaskItems = ({ selectedtab, tasks }) => {
    // console.log(selectedtab);
    // if(selectedtab === "NEXT_7"){
    //     return tasks.filter((task) => 
    //     isAfter(task.date,new Date()) &&
    //     isBefore(task.date, addDays(new Date(),7))
    //     ).map((task) => <p>{task.text}   {dateFnsFormat(new Date(task.date),FORMAT)}</p>)
    // }
    // if(selectedtab === "TODAY"){
    //     return tasks.filter((task) => 
    //     isToday(task.date)
    //     ).map((task) => <p>{task.text}   {dateFnsFormat(new Date(task.date),FORMAT)}</p>)
    // }
    // return tasks.map((task) => <p>{task.text}   {dateFnsFormat(new Date(task.date),FORMAT)}</p>)


    let taskToRender = [...tasks];
    if (selectedtab === "NEXT_7") {
        taskToRender = taskToRender.filter((task) =>
            isAfter(task.date, new Date()) &&
            isBefore(task.date, addDays(new Date(), 7))
        )
    }
    if (selectedtab === "TODAY") {
        taskToRender = taskToRender.filter((task) =>
            isToday(task.date)
        )
    }
    return (
        <div className="task-item-container">
            {taskToRender.map((task) =>
                <div className="task-item">
                    <p>{task.text} </p>
                    <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
                </div>
            )}
        </div>
    )

}
export const Tasks = ({ selectedtab }) => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    const addNewTask = (text, date) => {
        const newTaskItem = { text, date: date || new Date() }
        setTasks((prevState) => [...prevState, newTaskItem]);
    }
    // console.log(tasks);
    return (
        <div className="tasks">
            <h1>{TASK_HEADER_MAPPTING[selectedtab]}</h1>
            {selectedtab === "INBOX" && <div className="add-task-btn" onClick={() => setShowAddTask((prevState) => !prevState)}>
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div>}
            {showAddTask && < AddTask onAddTask={addNewTask} onCancel={() => setShowAddTask(!showAddTask)} />}

            {tasks.length > 0 ?
                (<TaskItems tasks={tasks} selectedtab={selectedtab} />)
                : <p>No tasks yet</p>}
        </div>
    )
    // tasks.map((task) => <p key={task}>
    //                 {task.text}
    //                 {dateFnsFormat(new Date(task.date), FORMAT)}
    //             </p>)
}
