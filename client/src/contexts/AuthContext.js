import { createContext } from "react";

function noop() {}

const authContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  refresh: noop,
  isAuth: false,
});

export default authContext;
