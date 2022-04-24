import React from "react";
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
} from "@chakra-ui/react";

function validateName(name) {
  return name.length > 0;
}

function NameInput({ value, setValue, ...props }) {
  const isInvalid = !validateName(value);

  return (
    <FormControl isInvalid={isInvalid}>
      <InputGroup size="md">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
          placeholder="email"
          {...props}
        />
      </InputGroup>
      {isInvalid && <FormErrorMessage>required field</FormErrorMessage>}
    </FormControl>
  );
}

export default NameInput;
