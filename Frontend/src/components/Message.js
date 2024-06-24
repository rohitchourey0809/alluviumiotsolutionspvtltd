import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Message = ({ message, isOwnMessage }) => {
  return (
    <Box
      bg={isOwnMessage ? "teal.500" : "gray.200"}
      color={isOwnMessage ? "white" : "black"}
      p="2"
      borderRadius="md"
      alignSelf={isOwnMessage ? "flex-end" : "flex-start"}
    >
      <Text>{message.text}</Text>
      <Text fontSize="xs">{message.user}</Text>
    </Box>
  );
};

export default Message;
