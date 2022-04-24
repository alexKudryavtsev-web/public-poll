import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Link,
  VStack,
  Heading,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link as NavLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.js";
import useHttp from "../../hooks/useHttp.js";

function Profile() {
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const [polls, setPolls] = useState([]);

  const fetchPolls = useCallback(async () => {
    try {
      const response = await request("/api/poll/readPolls", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setPolls(response);
    } catch (e) {}
  }, [request, auth.token]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return (
    <VStack align="stretch">
      <Box alignSelf="center">
        <Heading size="md">User poll</Heading>
      </Box>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>date</Th>
              <Th>title</Th>
              <Th>details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {polls.map((poll) => (
              <Tr key={poll.pollId}>
                <Th>{new Date(poll.date).toLocaleDateString()}</Th>
                <Th>{poll.title}</Th>
                <Th>
                  <Link
                    as={NavLink}
                    color="blue.300"
                    to={`poll-details/${poll.pollId}`}
                  >
                    open
                  </Link>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default Profile;
