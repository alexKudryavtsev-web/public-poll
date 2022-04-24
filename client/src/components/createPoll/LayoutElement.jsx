import { HStack, IconButton, Input } from "@chakra-ui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

function LayoutElement({
  setQuestion,
  setVariants,
  removeElement,
  index,
  element,
}) {
  return (
    <HStack>
      <Input
        flex={1}
        placeholder="question"
        value={element.question}
        onChange={(e) => setQuestion(index, e.target.value)}
      />
      <Input
        flex={2}
        placeholder="variants separated by commas"
        value={element.variants}
        onChange={(e) => setVariants(index, e.target.value)}
      />
      <IconButton
        icon={<AiFillDelete />}
        onClick={() => removeElement(index)}
        colorScheme="red"
      />
    </HStack>
  );
}

export default LayoutElement;
