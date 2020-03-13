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
    updatePlantInstance(plantInstanceId, updateValues) {
        return fetch(`${config.API_ENDPOINT}/garden/${plantInstanceId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(updateValues)
        })
        .then(res => {
            if (!res.ok) {return res.json.then(err => Promise.reject(err))} // Review
            return
        })
        .catch(res => console.log(res.error))
    }
}

export default ApiService;