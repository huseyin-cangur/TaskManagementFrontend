
import ITask from '../../Interfaces/Task';
import httpService from '../services/httpService'

const TaskService = {

    getTasksByUser: async (id: String) => {

        return httpService.get("Task/GetAll", { userId: id });
    },
    getTaskById: async (id: String) => {

        return httpService.get("Task/GetById", { id: id });
    },
    add: async (task: ITask) => {
        return httpService.post("Task/Create", task);
    }


}
export default TaskService;