import { Box } from "@chakra-ui/react";
import React from "react";
import PollDetails from "../components/pollDetails/PollDetails.jsx";

function PollDetailsPage() {
  return (
    <Box maxWidth="800px" paddingTop={5} margin="auto">
      <PollDetails />
    </Box>
  );
}

export default PollDetailsPage;
