import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdAlternateEmail } from "react-icons/md";
import React from "react";

function validateEmail(email) {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function EmailInput({ value, setValue, ...props }) {
  const isInvalid = !validateEmail(value);

  return (
    <FormControl isInvalid={isInvalid}>
      <InputGroup size="md">
        <InputLeftElement>
          <MdAlternateEmail />
        </InputLeftElement>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
          placeholder="email"
          {...props}
        />
      </InputGroup>
      {isInvalid && <FormErrorMessage>wrong email</FormErrorMessage>}
    </FormControl>
  );
}

export default EmailInput;
