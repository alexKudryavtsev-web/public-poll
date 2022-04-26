import React, { useRef, useState } from "react";
import { Box, Button, Heading, useDisclosure, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import PasswordInput from "../ui/passwordInput/PasswordInput.jsx";
import useHttp from "../../hooks/useHttp.js";
import ErrorAlert from "../ui/errorAlert/ErrorAlert.jsx";

function SetNewPassword() {
  const { isOpen, onClose: closeAlert, onOpen: openAlert } = useDisclosure();
  const { link } = useParams();
  const { request, error, clearError } = useHttp();
  const cancelRef = useRef();
  const [password, setPassword] = useState("");

  async function setNewPasswordBtnHandler() {
    try {
      await request("/api/auth/set-new-password", "POST", {
        newPassword: password,
        activationResetPasswordLink: link,
      });
      setPassword("");
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
            Set new password
          </Heading>
        </Box>
        <Box width="100%">
          <PasswordInput value={password} setValue={setPassword} />
        </Box>
        <Box>
          <Button colorScheme="blue" onClick={setNewPasswordBtnHandler}>
            set new password
          </Button>
        </Box>
      </VStack>
      <ErrorAlert
        isOpen={isOpen}
        error={error}
        close={closeAlert}
        cancelRef={cancelRef}
        messageOnSuccess="successfully set new password"
        clearError={clearError}
      />
    </>
  );
}

export default SetNewPassword;
