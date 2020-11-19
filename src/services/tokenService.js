import config from "../config";

let TokenService;
if (typeof window === 'undefined') { // Enables SSR code to run without `window` in its environment
  TokenService = {
    setToken: () => {},
    getToken: () => {},
    clearToken: () => {},
    hasToken: () => {return false},
  };
} else {
  TokenService = {
    setToken: (token) => {
      return window.localStorage.setItem(config.TOKEN_KEY, token);
    },
    getToken: () => {
      return window.localStorage.getItem(config.TOKEN_KEY);
    },
    clearToken: () => {
      return window.localStorage.removeItem(config.TOKEN_KEY);
    },
    hasToken: () => {
      return !!TokenService.getToken();
    },
  };
}

export default TokenService;
