
import TaskService from '../services/TaskService';
import UserService from '../services/UserService';
import { useEffect, useState } from 'react';
import ITask from '../../Interfaces/Task';
import TaskTable from '../components/TaskTable';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import IUser from '../../Interfaces/User';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Task = () => {

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'Adınız çok kısa!')
      .max(50, 'Adınız çok uzun!')
      .required('Adınız zorunludur!'),
  });

  const [tasks, setTasks] = useState<ITask[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [task, setTask] = useState<ITask>({
    id: '',
    title: '',
    description: '',
    status: false,
    userIds: []
  })
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
    userIds: string;
  }>({
    title: '',
    description: '',
    userIds: '',
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    handleResetForm();
  }


  const handleOpenModalChild = (open: boolean, id: string) => {


    setOpen(open);
    editTask(id)
  };


  var userId = localStorage.getItem('userId') ?? "";
  var isAdmin: boolean = JSON.parse(localStorage.getItem('isAdmin') ?? "");



  useEffect(() => {


    getTasks();
    UserService.getUsers().then((result) => {
      if (result) {
        console.log("result", result);
        setUsers(result)
      }

    })

  }, [])

  const getTasks = () => {
    TaskService.getTasksByUser(userId).then((result) => {

      if (result)
        setTasks(result);
    });
  }

  function getTaskById(id: String) {
    TaskService.getTaskById(id).then((result) => {
      if (result)

        setTask(result);
    })
  }

  function editTask(id: String) {
    getTaskById(id);


  }

  const validateForm = () => {

    // const newErrors: { title: any, description: any, userIds: any } = { title: '', description: '', userIds: [] };
    const newErrors: { [key: string]: string } = {};
    if (!task.title)
      newErrors.title = "Title is required";

    if (!task.description)
      newErrors.description = "Description is required";

    if (task.userIds.length == 0 && isAdmin) {
      newErrors.userIds = 'Users is required';
    }


    setErrors({
      title: newErrors.title || '',
      description: newErrors.description || '',
      userIds: newErrors.userIds || '',
    });

    return Object.keys(newErrors).length === 0;

  }

  const handleSubmit = () => {


    if (validateForm()) {

      if (!isAdmin)
        task.userIds.push(userId);

      TaskService.add(task).then((result) => {
        if (result) {

          setOpen(false);
          handleResetForm();
          alert("Ekleme işlemi başarılı")
          getTasks();

        }
      })
    }
    else {
      console.log('Form has errors');
    }



  }

  const handleResetForm = () => {

    setTask({
      id: '',
      title: '',
      description: '',
      status: false,
      userIds: []

    })
  }


  return (
    <>
      <Header />
      <TaskTable handleOpenModalChild={handleOpenModalChild} data={tasks} />
      <Button style={{ marginTop: '20px' }} onClick={() => setOpen(true)} variant="contained">Add task</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>

            {isAdmin ?
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Users</InputLabel>
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="users"
                  defaultValue={task.userIds}
                  label={"Status"}
                  onChange={(e) => {

                    if (Array.isArray(e.target.value)) {
                      task.userIds = e.target.value;
                    }
                  }}
                >
                  {users.map((item, index) => (
                    <MenuItem value={item.id} key={index}>
                      {item.fullName}
                    </MenuItem>
                  ))}

                </Select>
                {errors.userIds && <p style={{ color: 'red' }}>{errors.userIds}</p>}
              </FormControl>
              : <></>}

            <FormControl fullWidth>
              <TextField
                label={"Title"}
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={task.title}
                onChange={(e) => task.title = e.target.value}
              />
              {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={task.description}
                onChange={(e) => task.description = e.target.value}
              />
              {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={task.status}
                label={"Status"}

                onChange={(e) => task.status = JSON.parse(e.target.value.toString())}
              >
                <MenuItem value={"true"}>Completed</MenuItem>
                <MenuItem value={"false"}>Not Completed</MenuItem>
              </Select>

            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              variant="contained"
              color="primary"
              onClick={() => handleClose()}
            >
              Kapat
            </Button>
          </form>

        </Box>
      </Modal>


    </>

  )
}

export default Task