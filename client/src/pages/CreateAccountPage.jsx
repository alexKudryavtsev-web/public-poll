import React from "react";
import { Center } from "@chakra-ui/react";

import CreateAccount from "../components/createAccount/CreateAccount.jsx";

function CreateAccountPage() {
  return (
    <Center
      position="absolute"
      top="0"
      width="100vw"
      height="100vh"
      zIndex={-100}
    >
      <CreateAccount />
    </Center>
  );
}

export default CreateAccountPage;
