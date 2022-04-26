import { Box, Button, Heading, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useHttp from "../../hooks/useHttp.js";

import EmailInput from "../ui/emailInput/EmailInput.jsx";
import ErrorAlert from "../ui/errorAlert/ErrorAlert.jsx";

function ForgotPassword() {
  const { isOpen, onClose: closeAlert, onOpen: openAlert } = useDisclosure();
  const { request, error, clearError } = useHttp();
  const cancelRef = useRef();

  const [email, setEmail] = useState("");

  async function sendMailBtnHandler() {
    try {
      await request("/api/auth/reset-password", "POST", {
        email,
      });
    } catch (e) {
    } finally {
      openAlert();
    }
  }

  return (
    <>
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
          <Button onClick={sendMailBtnHandler} colorScheme="green">
            send mail
          </Button>
        </Box>
      </VStack>
      <ErrorAlert
        isOpen={isOpen}
        error={error}
        close={closeAlert}
        cancelRef={cancelRef}
        messageOnSuccess="letter sent to mail"
        clearError={clearError}
      />
    </>
  );
}

export default ForgotPassword;
