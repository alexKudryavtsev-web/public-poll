import {
  Box,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import React from "react";

import formatDate from "../../utils/formatDate.js";

function PollDetailsMetaData({ details }) {
  return (
    <>
      <Box alignSelf="center">
        <Heading>Meta Data</Heading>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Title of poll</Th>
              <Th>{details.title}</Th>
            </Tr>
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
    </>
  );
}

export default PollDetailsMetaData;
