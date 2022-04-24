import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

function PollDetailsRepyData({ replies }) {
  return (
    <>
      <Box alignSelf="center">
        <Heading>Reply Data</Heading>
      </Box>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>email</Th>
              <Th>question</Th>
              <Th>answer</Th>
            </Tr>
          </Thead>
          <Tbody>
            {replies.replies.map((reply) =>
              Object.entries(reply.reply).map((value, index) => (
                <Tr key={reply.id + value[0]}>
                  <Th>{index === 0 && reply.email}</Th>
                  <Th>{value[0]}</Th>
                  <Th>{value[1]}</Th>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PollDetailsRepyData;
