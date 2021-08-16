import List from "../components/List"
import { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Spring, animated } from 'react-spring'
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Home(){
    const [tasks, setTask] = useState([]);
    const user = useContext(UserContext);

    const desc = useRef();

    useEffect(() => {
        
        const getTasks = async () => {
            const tasksMain = await axios("lists/getLists");   
            setTask(tasksMain.data);
        }
        getTasks();
    }, []);

    const addList = async (e) => {
      e.preventDefault();
      const list = {
        desc: desc.current.value
      }
      desc.current.value = "";
      await axios.post("lists/addList", list);
      const newData = await axios.get("lists/getLists");
      setTask(newData.data);
    }
    const deleteList = async (id) => {
      await axios.delete(`/lists/deleteList/${id}`);
      setTask(tasks.filter(tasks => tasks._id !== id));
    }
    return (
      <>
        
        <div className="listContainer">
        <Link to="/profile" className="linkButtonProfile">
          {user?.name}
        </Link>
          <div className="list">
              <h1 style={{margin: "20px", color: "black"}}>Úkolníček</h1>
              <form style={{backgroundColor: "black"}} className="addForm listItem" onSubmit={addList}>
                <input type="text" className="inputAdd" placeholder="zadej název listu..." ref={desc} required/>
                <button style={{backgroundColor: "transparent", border: "none"}} type="submit">
                  <AddCircleOutlineIcon style={{color: "white"}} className="addListIcon" />
                </button>
              </form>
              { 
                tasks.map((t, index) => {
                  return (
                
                    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{delay: index}} key={t._id}>
                     {styles => 
                       <animated.div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", ...styles}} >
                        <List ListsArray={t} key={t._id} DeleteList={deleteList} />
                       </animated.div>
                     }
                    </Spring>
                  )
                })
              }
          </div>    
        </div>
      </>
    )
}

export default Home
