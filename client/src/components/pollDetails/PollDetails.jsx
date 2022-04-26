import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext.js";
import useHttp from "../../hooks/useHttp.js";

import PollDetailsMetaData from "../pollDetailsMetaData/PollDetailsMetaData.jsx";
import PollDetailsRepyData from "../pollDetailsReplyData/PollDetailsRepyData.jsx";
import Loader from "../ui/loader/Loader.jsx";

function PollDetails() {
  const { id } = useParams();
  const { request, isLoading } = useHttp();
  const auth = useContext(AuthContext);

  const [details, setDetails] = useState(null);
  const [replies, setReplies] = useState(null);

  async function closePollBtnHandler() {
    try {
      await request(
        `/api/poll/close-poll/${id}`,
        "POST",
        null,
        auth.calculateHeader(),
        auth
      );
      setDetails({ ...details, isOpened: false });
    } catch (e) {}
  }
  const fetchReply = useCallback(async () => {
    try {
      const response = await request(
        `/api/reply/read-replies/${id}`,
        "GET",
        null,
        auth.calculateHeader(),
        auth
      );
      setReplies(response);
    } catch (e) {}
  }, [request, auth, setReplies, id]);

  const fetchPollDetails = useCallback(async () => {
    try {
      const response = await request(
        `/api/poll/poll-details/${id}`,
        "GET",
        null,
        auth.calculateHeader(),
        auth
      );
      setDetails(response);
    } catch (e) {}
  }, [request, auth, setDetails, id]);

  useEffect(() => {
    fetchPollDetails();
  }, [fetchPollDetails]);

  useEffect(() => {
    fetchReply();
  }, [fetchReply]);

  if (isLoading || !details || !replies) {
    return <Loader />;
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
