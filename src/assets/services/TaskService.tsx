
import httpService from '../services/httpService'

const TaskService = {

    getTasksByUser: async (id:String) => {

        return httpService.get("Task/GetAll",{userId:id});
    },
    getTaskById: async (id:String) => {

        return httpService.get("Task/GetById",{id:id});
    }
     

}
export default TaskService;