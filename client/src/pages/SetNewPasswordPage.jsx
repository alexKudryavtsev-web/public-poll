import { Center } from "@chakra-ui/react";
import React from "react";

import SetNewPassword from "../components/setNewPassword/SetNewPassword.jsx";

function SetNewPasswordPage() {
  return (
    <Center
      position="absolute"
      top="0"
      width="100vw"
      height="100vh"
      zIndex={-100}
    >
      <SetNewPassword />
    </Center>
  );
}

export default SetNewPasswordPage;
