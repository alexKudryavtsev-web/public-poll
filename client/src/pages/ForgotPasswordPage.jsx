import { Center } from "@chakra-ui/react";
import React from "react";
import ForgotPassword from "../components/forgotPassword/ForgotPassword.jsx";

function ForgotPasswordPage() {
  return (
    <Center
      position="absolute"
      top={0}
      width="100vw"
      height="100vh"
      zIndex={-100}
    >
      <ForgotPassword />
    </Center>
  );
}

export default ForgotPasswordPage;
