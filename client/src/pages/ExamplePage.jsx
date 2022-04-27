import React from "react";
import { Box, Heading, VStack, Image, Divider } from "@chakra-ui/react";
import loginImage from "../static/loginImage.png";
import goToCreatePoll from "../static/goToCreatePollImage.png";
import createPollImage from "../static/createPollImage.png";
import savePollImage from "../static/savePollImage.png";
import findLinkToRepostImage from "../static/findLinkToRepostImage.png";
import replyDataImage from "../static/replyDataImage.png";
import findPollInProfileImage from "../static/findPollInProfileImage.png";
import closePollImage from "../static/closePollImage.png";

function ExamplePage() {
  return (
    <Box maxWidth="800px" paddingBottom={15} margin="auto">
      <VStack align="center" paddingTop={5}>
        <Box>
          <Heading>Example</Heading>
        </Box>
        <Box alignSelf="flex-start">
          <Heading size="md">Step 1: log in</Heading>
        </Box>
        <Box>
          <Image src={loginImage} height={250} />
        </Box>
        <Divider paddingBottom={5} />
        <Box alignSelf="flex-start">
          <Heading size="md">Step 2: go to "create poll"</Heading>
        </Box>
        <Box>
          <Image src={goToCreatePoll} height={50} />
        </Box>
        <Divider paddingBottom={5} />
        <Box alignSelf="flex-start">
          <Heading size="md">
            Step 3: create poll (input title and make layout)
          </Heading>
        </Box>
        <Box>
          <Image src={createPollImage} height={300} />
        </Box>
        <Divider paddingBottom={5} />
        <Box alignSelf="flex-start">
          <Heading size="md">Step 4: save poll</Heading>
        </Box>
        <Box>
          <Image src={savePollImage} height={50} />
        </Box>
        <Divider paddingBottom={5} />
        <Box alignSelf="flex-start">
          <Heading size="md">
            Step 5: find poll in profile and click "open"
          </Heading>
        </Box>
        <Box>
          <Image src={findPollInProfileImage} height={50} />
        </Box>
        <Divider paddingBottom={5} />
        <Box alignSelf="flex-start">
          <Heading size="md">Step 6: copy the link and repost it</Heading>
        </Box>
        <Box>
          <Image src={findLinkToRepostImage} height={50} />
        </Box>
        <Divider paddingBottom={5} />
        <Box alignSelf="flex-start">
          <Heading size="md">Step 7: here you can see the poll results</Heading>
        </Box>
        <Box>
          <Image src={replyDataImage} height={250} />
        </Box>
        <Divider paddingBottom={5} />
        <Box alignSelf="flex-start">
          <Heading size="md">Step 8: close the poll whenever you want</Heading>
        </Box>
        <Box>
          <Image src={closePollImage} height={50} />
        </Box>
      </VStack>
    </Box>
  );
}

export default ExamplePage;
