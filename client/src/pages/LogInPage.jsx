import { Center } from "@chakra-ui/react";
import React from "react";
import Login from "../components/login/Login.jsx";

function LogInPage() {
  return (
    <Center
      position="absolute"
      top="0"
      width="100vw"
      height="100vh"
      zIndex={-100}
    >
      <Login />
    </Center>
  );
}

export default LogInPage;
