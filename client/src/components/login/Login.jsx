import React, { useContext, useRef, useState } from "react";
import { Link as NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  VStack,
  Link,
  useDisclosure,
} from "@chakra-ui/react";

import EmailInput from "../ui/emailInput/EmailInput.jsx";
import PasswordInput from "../ui/passwordInput/PasswordInput.jsx";
import useHttp from "../../hooks/useHttp.js";
import authContext from "../../contexts/AuthContext.js";
import ErrorAlert from "../ui/errorAlert/ErrorAlert.jsx";

function Login() {
  const { request, error, clearError } = useHttp();

  const auth = useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
  const cancelRef = useRef();

  async function loginBtnHandler() {
    try {
      const response = await request("/api/auth/login", "POST", {
        email,
        password,
      });
      auth.login(response.accessToken, response.user);
    } catch (e) {
      openAlert();
    }
  }

  return (
    <>
      <VStack align="flex-start">
        <Box alignSelf="center">
          <Heading size="lg" m={2}>
            log in
          </Heading>
        </Box>
        <Box>
          <EmailInput value={email} setValue={setEmail} />
        </Box>
        <Box>
          <PasswordInput value={password} setValue={setPassword} />
        </Box>
        <Box>
          <Button colorScheme="green" onClick={loginBtnHandler}>
            log in
          </Button>
        </Box>
        <Box alignSelf="center">
          <Link color="blue.300" as={NavLink} to="/forgot-password">
            forgot password?
          </Link>
        </Box>
      </VStack>
      <ErrorAlert
        isOpen={isOpen}
        close={closeAlert}
        error={error}
        clearError={clearError}
        cancelRef={cancelRef}
      />
    </>
  );
}

export default Login;
