 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ITask from '../../Interfaces/Task';
import Button from '@mui/material/Button';


interface TaskTableProps {
    data: ITask[];
  }

const TaskTable : React.FC<TaskTableProps> = ({ data }) => {


  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell >Description</TableCell>
          <TableCell >Status</TableCell>
          <TableCell>Users</TableCell>
          <TableCell>Operations</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>
              {row.title}
            </TableCell>
            <TableCell >{row.description}</TableCell>
            <TableCell >{row.status == true ? "Tamamlandı" : "Tamamlanmadı"}</TableCell>
            <TableCell>{"USERS"}</TableCell>
            <TableCell>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TaskTable