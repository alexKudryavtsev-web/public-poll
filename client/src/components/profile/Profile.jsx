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
import Loader from "../ui/loader/Loader.jsx";

function Profile() {
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const [polls, setPolls] = useState(null);

  const fetchPolls = useCallback(async () => {
    try {
      const response = await request(
        "/api/poll/read-polls",
        "GET",
        null,
        auth.calculateHeader(),
        auth
      );
      setPolls(response);
    } catch (e) {}
  }, [request, auth, setPolls]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  if (!polls) {
    return <Loader />;
  }

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
