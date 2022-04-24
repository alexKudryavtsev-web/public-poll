import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import EmailInput from "../ui/emailInput/EmailInput.jsx";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <VStack align="flex-start">
      <Box alignSelf="center">
        <Heading size="lg" m={2}>
          Forgot Password?
        </Heading>
      </Box>
      <Box width="100%">
        <EmailInput value={email} setValue={setEmail} />
      </Box>
      <Box>
        <Button colorScheme="green">send mail</Button>
      </Box>
    </VStack>
  );
}

export default ForgotPassword;
