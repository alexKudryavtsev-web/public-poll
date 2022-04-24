import { useRoutes } from "react-router-dom";

import AuthContext from "./contexts/AuthContext.js";
import useAuth from "./hooks/useAuth.js";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import MainHeader from "./components/mainHeader/MainHeader.jsx";
import { useEffect } from "react";

function RoutesComponent({ isAuth }) {
  const routes = useRoutes(isAuth ? PRIVATE_ROUTES : PUBLIC_ROUTES);

  return routes;
}

function App() {
  const auth = useAuth();
  const isAuth = Boolean(auth.token);

  return (
    <AuthContext.Provider value={{ ...auth, isAuth }}>
      <>
        <MainHeader isAuth={isAuth} />
        <RoutesComponent isAuth={isAuth} />
      </>
    </AuthContext.Provider>
  );
}

export default App;
