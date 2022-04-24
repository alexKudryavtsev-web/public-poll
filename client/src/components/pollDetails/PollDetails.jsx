import {
  Box,
  Heading,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext.js";
import useHttp from "../../hooks/useHttp.js";
import formatDate from "../../utils/formatDate.js";
import formatQuestion from "../../utils/formatQuestion.js";

function PollDetails() {
  const { id } = useParams();
  const { request, isLoading, error } = useHttp();
  const auth = useContext(AuthContext);

  const [details, setDetails] = useState(null);

  const fetchReply = useCallback(async () => {
    try {
      console.log("HERE, fetch", id);
      const response = await request(
        `/api/reply/readReplies/${id}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      console.log("HERES");
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchPollDetails = useCallback(async () => {
    try {
      const response = await request(
        `/api/poll/pollDetails/${id}`,
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

  if (isLoading || !details) {
    return <Spinner />;
  }
  return (
    <VStack align="stretch">
      <Box alignSelf="center">
        <Heading>{formatQuestion(details?.title)}</Heading>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Date of created</Th>
              <Th>{formatDate(details.date)}</Th>
            </Tr>
            <Tr>
              <Th>Link to repost</Th>
              <Td>
                <Link href={details.link} color="blue.300" isExternal>
                  {details.link}
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Th>Status</Th>
              <Th>{details.isOpened ? "open" : "close"}</Th>
            </Tr>
            <Tr>
              <Th>Watch poll</Th>
              <Th>{details.visitedCount}</Th>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default PollDetails;
