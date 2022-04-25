import { Box } from "@chakra-ui/react";
import React from "react";
import TakePoll from "../components/takePoll/TakePoll.jsx";

function TakePollPage() {
  return (
    <Box maxWidth="650px" margin="auto">
      <TakePoll />
    </Box>
  );
}

export default TakePollPage;
