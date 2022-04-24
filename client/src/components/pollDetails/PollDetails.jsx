import { Box, Button, Center, Spinner, VStack } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext.js";
import useHttp from "../../hooks/useHttp.js";

import PollDetailsMetaData from "../pollDetailsMetaData/PollDetailsMetaData.jsx";
import PollDetailsRepyData from "../pollDetailsReplyData/PollDetailsRepyData.jsx";

function PollDetails() {
  const { id } = useParams();
  const { request, isLoading } = useHttp();
  const auth = useContext(AuthContext);

  const [details, setDetails] = useState(null);
  const [replies, setReplies] = useState(null);

  async function closePollBtnHandler() {
    try {
      await request(`/api/poll/close-poll/${id}`, "POST", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setDetails({ ...details, isOpened: false });
    } catch (e) {}
  }
  const fetchReply = useCallback(async () => {
    try {
      const response = await request(
        `/api/reply/read-replies/${id}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setReplies(response);
    } catch (e) {}
  }, []);

  const fetchPollDetails = useCallback(async () => {
    try {
      const response = await request(
        `/api/poll/poll-details/${id}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setDetails(response);
    } catch (e) {}
  }, [request, auth.token]);

  useEffect(() => {
    fetchPollDetails();
  }, [fetchPollDetails]);

  useEffect(() => {
    fetchReply();
  }, [fetchReply]);

  if (isLoading || !details || !replies) {
    return (
      <Center
        position="absolute"
        top={0}
        width="100vw"
        height="100vh"
        zIndex={-100}
        left={0}
      >
        <Spinner />
      </Center>
    );
  }
  return (
    <VStack align="stretch" paddingBottom={10}>
      <PollDetailsMetaData details={details} />
      {details.isOpened && (
        <Box>
          <Button onClick={closePollBtnHandler} colorScheme="blue">
            close poll
          </Button>
        </Box>
      )}
      <PollDetailsRepyData replies={replies} />
    </VStack>
  );
}

export default PollDetails;
