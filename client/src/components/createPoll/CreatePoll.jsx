import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import useInput from "../../hooks/useInput.js";
import AuthContext from "../../contexts/AuthContext.js";
import useHttp from "../../hooks/useHttp.js";
import LayoutElement from "./LayoutElement.jsx";
import ErrorAlert from "../ui/errorAlert/ErrorAlert.jsx";

const initialValue = [{ question: "", variants: "" }];

function CreatePoll() {
  const { isOpen, onClose: closeAlert, onOpen: openAlert } = useDisclosure();
  const cancelRef = useRef();
  const title = useInput();
  const auth = useContext(AuthContext);
  const { request, error, clearError } = useHttp();

  const [layout, setLayout] = useState(initialValue);

  function setQuestion(index, question) {
    setLayout(
      layout.map((element, currentIndex) =>
        currentIndex === index ? { ...element, question } : element
      )
    );
  }

  function setVariants(index, variants) {
    setLayout(
      layout.map((element, currentIndex) =>
        currentIndex === index ? { ...element, variants } : element
      )
    );
  }

  function removeElement(index) {
    setLayout(layout.filter((value, currentIndex) => currentIndex !== index));
  }

  function addQuestionBtnHandler() {
    setLayout(layout.concat({ question: "", variants: "" }));
  }

  async function creatPollBtnHandler() {
    try {
      const formattedLayout = layout.map((element) => ({
        ...element,
        variants: element.variants.split(",").map((variant) => variant.trim()),
      }));

      await request(
        "/api/poll/create-poll",
        "POST",
        {
          title: title.value,
          layout: formattedLayout,
        },
        auth.calculateHeader()
      );

      setLayout(initialValue);
      title.clear();
    } catch (e) {
    } finally {
      openAlert();
    }
  }

  return (
    <>
      <VStack align="stretch" paddingTop="5">
        <Box alignSelf="center">
          <Heading>Create poll</Heading>
        </Box>
        <HStack>
          <Button colorScheme="blue" onClick={creatPollBtnHandler}>
            save
          </Button>
          <Button colorScheme="teal" onClick={addQuestionBtnHandler}>
            add question
          </Button>
        </HStack>
        <Box>
          <Input
            placeholder="title"
            value={title.value}
            onChange={title.onChange}
          />
        </Box>
        <Divider />
        <Box>
          <Heading size="md">layout:</Heading>
        </Box>

        {layout.map((element, currentIndex) => (
          <LayoutElement
            key={currentIndex}
            element={element}
            index={currentIndex}
            setQuestion={setQuestion}
            setVariants={setVariants}
            removeElement={removeElement}
          />
        ))}
      </VStack>
      <ErrorAlert
        messageOnSuccess="poll is created"
        isOpen={isOpen}
        close={closeAlert}
        clearError={clearError}
        error={error}
        cancelRef={cancelRef}
      />
    </>
  );
}

export default CreatePoll;
