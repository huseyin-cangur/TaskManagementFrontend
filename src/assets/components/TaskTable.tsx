
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
  handleOpenModalChild: any
  handleRemoveTask: any
}

const TaskTable: React.FC<TaskTableProps> = ({ data, handleOpenModalChild, handleRemoveTask }) => {

  const handleSubmit = (id: string) => {
    handleOpenModalChild(true, id);  // Parent'a mesajı gönderiyoruz
    // Mesaj kutusunu temizliyoruz
  };

  const handleRemove = (id: string) => {
    handleRemoveTask(id);

  }

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
              <TableCell>{row.userNames.join(",")}</TableCell>
              <TableCell>
                <Button onClick={() => handleSubmit(row.id)}>Edit</Button>
                <Button onClick={() => handleRemove(row.id)}>Delete</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TaskTable