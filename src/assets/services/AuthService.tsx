import Login from '../../Interfaces/Login';
import httpService from '../services/httpService'

const authService = {

    login: async (params: Login) => {

        return httpService.get("Auth/Login",params);

    }

}
export default authService;