
import TaskService from '../services/TaskService';
import { useEffect, useState } from 'react';
import ITask from '../../Interfaces/Task';

import TaskTable from '../components/TaskTable';
import Header from '../components/Header';

const Task = () => {


  const [tasks, setTasks] = useState<ITask[]>([])
  const [task, setTask] = useState<ITask>()


  var userId = localStorage.getItem('userId') ?? "";

  useEffect(() => {

    TaskService.getTasksByUser(userId).then((result) => {

      if (result)
        setTasks(result);
    });

  }, [])




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
     <Header/>  
     <TaskTable data={tasks}/>

    </>

  )
}

export default Task