
import TaskService from '../services/TaskService';
import { useEffect, useState } from 'react';
import ITask from '../../Interfaces/Task';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TaskTable from '../components/TaskTable';

const Task = () => {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState<ITask[]>([])
  const [task, setTask] = useState<ITask>()


  var userId = localStorage.getItem('userId') ?? "";
  var userName = localStorage.getItem('userName') ?? "";
  var isAdmin = localStorage.getItem('isAdmin') ?? "";
  useEffect(() => {

    TaskService.getTasksByUser(userId).then((result) => {

      if (result)
        setTasks(result);
    });

  }, [])


  function logOut() {

    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("isAdmin")

    navigate("/login");
  }

  function getTaskById(id: String) {
    TaskService.getTaskById(id).then((result) => {
      if (result)
        setTask(result);
    })
  }

  function edit(id: String) {
    getTaskById(id);

  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tasks
            </Typography>

            <p>{userName}</p>
            {isAdmin == "true" ? <p>(ADMİN)</p> : ""}
            <Button onClick={logOut} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
     
     <TaskTable data={tasks}/>

    </>

  )
}

export default Task