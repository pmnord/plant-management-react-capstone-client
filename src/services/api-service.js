import TokenService from './token-service'
import config from '../config'

const ApiService = {
    getUserPlants() {
        return fetch(`${config.API_ENDPOINT}/garden/`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {return res.json.then(err => Promise.reject(err))} // Review
            return res.json();
        })
        .then(data => data)
    },
}

export default ApiService;