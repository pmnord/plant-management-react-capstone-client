export default {
    API_ENDPOINT: process.env.NODE_ENV === "development"
        ? "http://localhost:8000/api"
        : process.env.REACT_APP_FANCYPLANTS_SERVER,
    API_KEY: process.env.REACT_APP_FANCYPLANTS_API_KEY,
    TOKEN_KEY: `Authorization`,
}