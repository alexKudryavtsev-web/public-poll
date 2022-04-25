import React, { useCallback, useEffect, useRef, useState } from "react";
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
  Center,
  Heading,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import useHttp from "../../hooks/useHttp.js";
import EmailInput from "../ui/emailInput/EmailInput.jsx";
import formatQuestion from "../../utils/formatQuestion.js";

function TakePoll() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { code } = useParams();
  const { request, error, isLoading, clearError } = useHttp();
  const cancelRef = useRef();

  const [details, setDetails] = useState(null);
  const [email, setEmail] = useState("");
  const [reply, setReply] = useState({});

  function changeReply(id, newValue) {
    setReply({ ...reply, [id]: newValue });
  }

  async function saveReply() {
    try {
      await request("/api/reply/create-reply", "POST", {
        pollId: details.pollId,
        reply,
        email,
      });

      setReply({});
      setEmail("");
    } catch (e) {
    } finally {
      onOpen();
    }
  }

  const fetchPoll = useCallback(async () => {
    try {
      const response = await request(`/api/poll/poll-details/${code}`);
      setDetails(response);
    } catch (e) {}
  }, [request, code, setDetails]);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  if (isLoading) {
    return (
      <Center
        position="absolute"
        top={0}
        left={0}
        zIndex={-100}
        width="100vw"
        height="100vh"
      >
        <Spinner />
      </Center>
    );
  }

  if (details && !details.isOpened) {
    return (
      <Center
        position="absolute"
        top={0}
        left={0}
        zIndex={-100}
        width="100vw"
        height="100vh"
      >
        <Heading>{details.title} is close</Heading>
      </Center>
    );
  }

  return (
    <>
      <VStack paddingTop={5} align="stretch">
        <Box>
          <Heading>{details?.title}</Heading>
        </Box>
        <Box>
          <Heading size="xs">Write your mail to verify the answer:</Heading>
        </Box>
        <Box>
          <EmailInput value={email} setValue={setEmail} />
        </Box>
        {details?.layout.map((element) => (
          <Box paddingBottom={5} key={element.id}>
            <Heading size="md">{formatQuestion(element.question)}</Heading>
            <RadioGroup
              value={element[element.id]}
              onChange={(value) => changeReply(element.id, value)}
            >
              <Stack direction="row">
                {element.variants.map((variant) => (
                  <Radio value={variant} key={variant}>
                    {variant}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        ))}
        <Box>
          <Button onClick={saveReply} colorScheme="teal">
            save
          </Button>
        </Box>
      </VStack>
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
          <AlertDialogBody>
            {error || "Thank you for participating in the poll"}
          </AlertDialogBody>
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
    </>
  );
}

export default TakePoll;
