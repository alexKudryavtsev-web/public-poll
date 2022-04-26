import React, { useRef, useState } from "react";
import { Box, Button, Heading, useDisclosure, VStack } from "@chakra-ui/react";

import EmailInput from "../ui/emailInput/EmailInput.jsx";
import PasswordInput from "../ui/passwordInput/PasswordInput.jsx";
import NameInput from "../ui/nameInput/NameInput.jsx";
import ErrorAlert from "../ui/errorAlert/ErrorAlert.jsx";

import useHttp from "../../hooks/useHttp.js";

function CreateAccount() {
  const { request, error, clearError } = useHttp();

  const { isOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
  const cancelRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  async function onCreateAccountBtnHandler() {
    try {
      await request("/api/auth/registration", "POST", {
        email,
        password,
        firstname,
        lastname,
      });
    } catch (e) {
    } finally {
      openAlert();
    }
  }

  return (
    <>
      <VStack align="stretch">
        <Box alignSelf="center">
          <Heading size="lg" m={2}>
            create account
          </Heading>
        </Box>
        <Box>
          <EmailInput value={email} setValue={setEmail} />
        </Box>
        <Box width="100%">
          <NameInput
            value={firstname}
            setValue={setFirstname}
            placeholder="first name"
          />
        </Box>
        <Box width="100%">
          <NameInput
            value={lastname}
            setValue={setLastname}
            placeholder="last name"
          />
        </Box>
        <Box>
          <PasswordInput value={password} setValue={setPassword} />
        </Box>
        <Box>
          <Button onClick={onCreateAccountBtnHandler} colorScheme="blue">
            create account
          </Button>
        </Box>
      </VStack>

      <ErrorAlert
        messageOnSuccess="letter sent to mail"
        isOpen={isOpen}
        close={closeAlert}
        clearError={clearError}
        error={error}
        cancelRef={cancelRef}
      />
    </>
  );
}

export default CreateAccount;
