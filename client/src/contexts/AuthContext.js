import { createContext } from "react";

function noop() {}

const authContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  refresh: noop,
  isAuth: false,
  calculateHeader: noop,
});

export default authContext;
