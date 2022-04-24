import React, { useState } from "react";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

import PasswordInput from "../ui/passwordInput/PasswordInput.jsx";

function SetNewPassword() {
  const [password, setPassword] = useState("");

  return (
    <VStack align="flex-start">
      <Box alignSelf="center">
        <Heading size="lg" m={2}>
          Set new password
        </Heading>
      </Box>
      <Box width="100%">
        <PasswordInput value={password} setValue={setPassword} />
      </Box>
      <Box>
        <Button colorScheme="blue">send mail</Button>
      </Box>
    </VStack>
  );
}

export default SetNewPassword;
