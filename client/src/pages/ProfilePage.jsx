import { Box } from "@chakra-ui/react";
import React from "react";
import Profile from "../components/profile/Profile.jsx";

function ProfilePage() {
  return (
    <Box maxWidth="800px" paddingTop={5} margin="auto">
      <Profile />
    </Box>
  );
}

export default ProfilePage;
