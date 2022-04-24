import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Heading,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import EmailInput from "../ui/emailInput/EmailInput.jsx";
import PasswordInput from "../ui/passwordInput/PasswordInput.jsx";
import NameInput from "../ui/nameInput/NameInput.jsx";

import useHttp from "../../hooks/useHttp.js";

function CreateAccount() {
  const { isLoading, request, error } = useHttp();

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
        <Box alignSelf="center">{isLoading && <Spinner />}</Box>
      </VStack>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>answer from server:</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{error || "letter sent to mail"}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} colorScheme="red" onClick={closeAlert}>
              Okey
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CreateAccount;
