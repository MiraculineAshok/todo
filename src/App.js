import React, { useState, useEffect} from "react";
import Box from "./components/Box/Box";
import Para from "./components/Para/Para";
import "./App.css";
import Button from "./components/Button/Button";
import Inputbox from "./components/Inputbox/Inputbox";
import Popup from "./components/Popup/Popup";



function App() {
  const [message, setMessage] = useState([]);
  const [added, setAdded] = useState(false);
  const [editTriggred, setEditTriggred] = useState(false);
  const [showAddTaskForm, showAddTask] = useState(false);

  const ref = React.createRef();

  useEffect(() => {
   showTasks();
  }, [added]);

  const showTasks = () =>{
    fetch("https://cloudy-pear-lemur.cyclic.app/api/getTask")
      .then((res) => res.json())
      .then((data) => {setMessage(data); console.log(data);});
  }

  const showTaskForm =() => {
    showAddTask(!showAddTaskForm);
    console.log(showAddTaskForm);
  };

  const deleteTask = (e) => {
    console.log(e.target.id);
    fetch("https://cloudy-pear-lemur.cyclic.app/api/deleteTask", {
      method: "POST", 
      mode: "cors",
      headers: {
              "Content-Type": "application/json",
            },
      body:JSON.stringify({
        taskId:e.target.id
      })
    })
     .then((res) => res.json())
     .then((data) =>  setAdded(!added));
      console.log(added,"added");
  }

  const addTask =(e) => {
    
    fetch("https://cloudy-pear-lemur.cyclic.app/api/addTask", {
      method: "POST", 
      mode: "cors",
      headers: {
              "Content-Type": "application/json",
            },
      body:JSON.stringify({
        taskName:ref.current.value,
        taskStatus:"active"
      })
    })
      .then((res) => res.json())
      .then((data) =>  setAdded(!added));
      console.log(added,"added");
  };

  const editTask = (e) => {
    setEditTriggred(!editTriggred);
    console.log(editTriggred,"edit");
  }


  return (
    <div className="App">
      <div>
      <h1>All Tasks</h1>
      <Button text="AddTask" onclick={showTaskForm}></Button>
      {showAddTaskForm? 
      <div>
      <Inputbox type="text" ref={ref}/> 
      <Button text="Submit" onclick={addTask} ></Button></div>
      : null} 
      </div>
      
      {
        message.map((item, index) => {
          return <Box key={index} id={item.id} text= {
          <>
          {Object.values(item).map((x,i) => { 
            return <Para text={x} key={i}></Para>})
            }
            <Button onclick={deleteTask} text="Delete" id={item.id}></Button>
            <Button onclick={editTask} text="Edit" id={item.id}></Button>
            </>
          }>
           
          </Box>

        })
      }
     {editTriggred? <Popup></Popup> : null} 
    </div>
  );
}

export default App
