//import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Task from "../components/Task";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios";
import { animated, Spring } from "react-spring";

const Tasks = () => {
    const {id: idList, listName } = useParams();
    const [jsonTasks, setJsonTasks] = useState([]);
    const [newReminder, setNewReminder] = useState(false);
    const [sortCategory, setSortCategory] = useState("");
    const [categoryArray, setCategoryArray] = useState([]);
    const [lenghtOfCompleted, setLenghtOfCompleted] = useState();

    const what = useRef();
    const category = useRef();

    useEffect(() => {
        const getAllTasks = async () => {
            const tasks = await axios.get(`/tasks/getTasks/${idList}`);
            setJsonTasks(tasks.data);
            const length = tasks.data.filter( (tasks) => tasks.type === true ).length;
            setLenghtOfCompleted(length);
        }
        getAllTasks();
        deleteDuplicatedItems();
    }, [idList]);

    const deleteDuplicatedItems = async () => {
        // deleted diplicated items form Array of categories
        const tasks = await axios.get(`/tasks/getTasks/${idList}`);
        const array = tasks.data;
        const newArray = [];
        array.forEach((task) => {
            newArray.push(task.category);
        })
        const result = newArray.filter(function(item, pos) {
            return newArray.indexOf(item) === pos;
        })
        setCategoryArray(result);
    }

    const setCategory = (e) => {
        e.target.value === "All" ? setSortCategory("") : setSortCategory(e.target.value);
        
    }

    const toggleReminder = () => {
        setNewReminder(!newReminder);
    }

    const deleteTask = async (id) => {
        //const oneTask = jsonTasks.filter(task => task.what === what && task.category === category);
        await axios.delete(`/tasks/deleteTask/${id}`);
        setJsonTasks(jsonTasks.filter(task => task._id !== id));
        deleteDuplicatedItems();
    }

    const addTask = async (e) => {
        e.preventDefault();
        const data= {
            what: what.current.value,
            category: category.current.value,
            reminder: newReminder
        }
        await axios.put(`/tasks/addTask/${idList}`, data);
        const newTasks = await axios.get(`/tasks/getTasks/${idList}`);
        setJsonTasks(newTasks.data);
        what.current.value = "";
        category.current.value = "";
        deleteDuplicatedItems();
    }

    const setJsonTaskUpdate = async () => {
        const tasks = await axios.get(`/tasks/getTasks/${idList}`);
        setJsonTasks(tasks.data);
    }

    const updateComleteLenght = async (boolean) => {
        if (boolean) {
            setLenghtOfCompleted(lenghtOfCompleted + 1);
        } else {
            setLenghtOfCompleted(lenghtOfCompleted - 1);
        }
    
    }

    return (
        <div className="listContainer">
            <div className="list">
                <h1 style={{padding: "20px", color: "black"}}>{listName}</h1>
                <span>{`${lenghtOfCompleted} z ${jsonTasks.length}`}</span>
                <div className="selectDivMain">
                    <Link to="/">
                        <ArrowBackIcon style={{backgroundColor: "black", color: "white", borderRadius: "3px", fontSize: "30px", width: "50px"}}/>
                    </Link>
                    <select onChange={setCategory} className="categorySelect">
                        <option default>All</option>
                        {
                            categoryArray.map((task, index) => {         
                                    return (
                                        <option key={index}>{task}</option>
                                    )  
                            })   
                        }
                    </select>
                   
                </div>  
                <form style={{backgroundColor: "black"}} className="addForm listItem" onSubmit={addTask}>
                    <div className="addDivItem">
                        <input type="text" className="inputAddTask" ref={what} placeholder="zadej název tasku..."  required/>
                        <input type="text" className="inputAddTask" ref={category} placeholder="zadej název kategorie..."  required/>
                        <span className="kategorieCheck">Upozornění<input type="checkbox" onChange={toggleReminder} className="inputAddTask"/></span>
                    </div>
                    <button style={{backgroundColor: "transparent", border: "none"}} type="submit">
                    <AddCircleOutlineIcon style={{color: "white"}} className="addListIcon" />
                    </button>
                </form>
                {   




                    jsonTasks.map((task, index) => {
                        if (sortCategory === "") {
                            return (  
                                <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{delay: index}} key={task._id}>   
                                    {styles => 
                                        <animated.div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", ...styles}} >                  
                                            <Task taskValues={task} DeleteTask={deleteTask} key={task._id} SetCategory={setCategory} DeleteDuplicatedItems={deleteDuplicatedItems} updateLenghtOfCompleted={updateComleteLenght} setJsonTaskUpdate={setJsonTaskUpdate}/>
                                        </animated.div>
                                    }   
                                </Spring>
                            )
                        }  else {
                            if (task.category === sortCategory) {
                                return (                        
                                    <Task taskValues={task} DeleteTask={deleteTask} key={task._id} SetCategory={setCategory} DeleteDuplicatedItems={deleteDuplicatedItems} updateLenghtOfCompleted={updateComleteLenght}/>
                                )
                            }
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Tasks
