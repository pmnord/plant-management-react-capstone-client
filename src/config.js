const config = {
  API_ENDPOINT:
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? "http://localhost:8000/api"
      : process.env.REACT_APP_API_ENDPOINT,
  API_KEY: process.env.REACT_APP_API_KEY,
  TREFLE_API_KEY: process.env.TREFLE_API_KEY,
  TOKEN_KEY: "Authorization",
};

export default config;
