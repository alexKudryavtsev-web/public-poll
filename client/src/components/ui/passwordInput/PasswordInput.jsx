import React from "react";
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

function validatePassword(password) {
  return password.length >= 6;
}

function PasswordInput({ value, setValue, ...props }) {
  const [isShow, setIsShow] = React.useState(false);
  const isInvalid = !validatePassword(value);

  function handleClick() {
    setIsShow(!isShow);
  }

  return (
    <FormControl isInvalid={isInvalid}>
      <InputGroup size="md">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={isShow ? "text" : "password"}
          placeholder="password"
          {...props}
        />
        <InputRightElement onClick={handleClick}>
          {isShow ? <RiEyeOffLine /> : <RiEyeLine />}
        </InputRightElement>
      </InputGroup>
      {isInvalid && <FormErrorMessage>wrong password</FormErrorMessage>}
    </FormControl>
  );
}

export default PasswordInput;
