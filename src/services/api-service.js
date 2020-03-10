import TokenService from './token-service'
import config from '../config'

const ApiService = {
    getUserPlants(id) {
        return fetch(`${config.API_ENDPOINT}/garden/`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {return res.json.then(err => Promise.reject(err))} // Come back to
            return res.json();
        })
    },
}

export default ApiService;