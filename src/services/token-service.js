import config from '../config'

const TokenService = {
    setToken(token) {
        window.localStorage.setItem(`${config.TOKEN_KEY}`, token)
    },
    getToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
    },
    clearToken() {
        window.localStorage.removeItem(config.TOKEN_KEY)
    },
    hasToken() {
        return !!TokenService.getToken()
    }
}

export default TokenService