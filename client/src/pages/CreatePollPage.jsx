import { Box } from "@chakra-ui/react";
import React from "react";

import CreatePoll from "../components/createPoll/CreatePoll.jsx";

function CreatePollPage() {
  return (
    <Box maxWidth="900px" margin="auto">
      <CreatePoll />
    </Box>
  );
}

export default CreatePollPage;
