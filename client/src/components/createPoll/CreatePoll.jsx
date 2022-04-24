import React, { useContext, useRef, useState } from "react";
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

function CreatePoll() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef();
  const title = useInput();
  const auth = useContext(AuthContext);
  const { request, error, clearError } = useHttp();

  const [layout, setLayout] = useState([{ question: "", variants: "" }]);

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
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      setLayout([{ question: "", variants: "" }]);
      title.clear();
    } catch (e) {
    } finally {
      onOpen();
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
          <Input placeholder="title" {...title} />
        </Box>
        <Divider />
        <Box>
          <Heading size="md">layout: </Heading>
        </Box>

        {layout.map((element, currentIndex) => (
          <LayoutElement
            element={element}
            index={currentIndex}
            setQuestion={setQuestion}
            setVariants={setVariants}
            removeElement={removeElement}
          />
        ))}
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>answer from server:</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>{error || "Poll is created"}</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                colorScheme="red"
                onClick={() => {
                  clearError();
                  onClose();
                }}
              >
                Okey
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </VStack>
    </>
  );
}

export default CreatePoll;
