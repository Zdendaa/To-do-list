import { Link } from "react-router-dom"
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import ArrowForwardTwoToneIcon from '@material-ui/icons/ArrowForwardTwoTone';
import axios from "axios";
import { useEffect, useState } from "react";

const List = ({ListsArray, DeleteList}) => {
    const [listsArray, setlistsArray] = useState(ListsArray);
    const [tasksLength, setTasksLenght] = useState();
    
    useEffect(() => {
        const getTaskArray = async () => {
            const tasklenght = await axios.get(`/tasks/getTasks/${listsArray._id}`);
            setTasksLenght(tasklenght.data.length);
        }
        getTaskArray();
    }, [listsArray._id]);

    const updateDesc = async (e) => {
        const descVal = {
            desc: e.target.value
        }
        setlistsArray(prevState => ({
            ...prevState,
            desc: e.target.value
         }));
        await axios.put(`/lists/updateDesc/${listsArray._id}`, descVal); 
    }


    return (
        <>
            <div className="listItem" style={{color: "black"}}>
                <div className="leftItems">
                    <input className="descListInput" onChange={updateDesc} value={listsArray.desc}/> <br/>
                    <span>{tasksLength ? (tasksLength === 1 ? `${tasksLength} úkol` : tasksLength === 0 ? "0 úkolů" : tasksLength <= 4 ? `${tasksLength} úkoly` : `${tasksLength} úkolů`) : "0 úkolů"}</span>
                </div>
                <div className="rightItems">
                    <Link to={`/tasks/${listsArray._id}/${listsArray.desc}`} style={{textDecoration: "none", color: "black"}}>
                        <ArrowForwardTwoToneIcon style={{backgroundColor: "black", color: "white", fontSize: "40px"}} className="colorItem"/>   
                    </Link>
                    <HighlightOffTwoToneIcon onClick={() => DeleteList(listsArray._id)} className="deleteTaskIcon"/>  
                </div>

            </div>
        </>   
    )
}

export default List
