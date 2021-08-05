import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from 'axios';
import { useState } from 'react';

const Task = ({ taskValues, DeleteTask, ID, DeleteDuplicatedItems, updateLenghtOfCompleted, setJsonTaskUpdate }) => {
    const [tasksArrayWhat, setTasksArrayWhat] = useState(taskValues.what);
    const [tasksArrayCategory, setTasksArrayCategory] = useState(taskValues.category);
    const [tasksArrayReminder, setTasksArrayReminder] = useState(taskValues.reminder);
    const [tasksType, setTasksType] = useState(taskValues.type);

    const updateWhat = async (e) => {
        
        const whatValue = {
            what: e.target.value
        }
        setTasksArrayWhat(e.target.value);
        
        await axios.put(`/tasks/updateWhat/${taskValues._id}`, whatValue);
        
    }   

    const updateCategory = async (e) => {
        DeleteDuplicatedItems();
        const categoryValue = {
            category: e.target.value
        }
        setTasksArrayCategory(e.target.value);
        
        await axios.put(`/tasks/updateCategory/${taskValues._id}`, categoryValue);
        setJsonTaskUpdate();
        
    }

    const changeReminder = async (e) => {
        console.log("change");
        const reminderValue = {
            reminder: !tasksArrayReminder
        }
        setTasksArrayReminder(!tasksArrayReminder);
        await axios.put(`/tasks/updateReminder/${taskValues._id}`, reminderValue);
    }

    const changeType = async (e) => {
        const typeValue = {
            type: !tasksType
        }
        console.log(tasksType);
        updateLenghtOfCompleted(!tasksType);
        setTasksType(!tasksType);
        await axios.put(`/tasks/updateType/${taskValues._id}`, typeValue);
    }

    console.log(tasksType);

    return (
        <div className={tasksArrayReminder === true ? "listItem reminder" : "listItem"} onDoubleClick={changeReminder}>
            <div>
            <input className={tasksType ? "whatTaskInput complete" : "whatTaskInput"} onChange={updateWhat} value={tasksArrayWhat}/> 
            <input className="categoryTaskInput" onChange={updateCategory} value={tasksArrayCategory}/> 
            </div>
            <div className="iconsForTask">
                {   
                    tasksType ? <CheckBoxIcon style={{cursor: "pointer"}} onClick={changeType} /> : <CheckBoxOutlineBlankIcon style={{cursor: "pointer"}} onClick={changeType} />
                }
                <DeleteOutlineIcon style={{cursor: "pointer"}} onClick={() => DeleteTask(taskValues._id)} />
            </div>
        </div>
    )
}

export default Task
