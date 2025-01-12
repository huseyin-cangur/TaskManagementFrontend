import httpService from '../services/httpService'

const UserService = {

    getUsers: async () => {

        return httpService.get("User/GetAll");
    },

}
export default UserService;