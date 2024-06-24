import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import api from "../api";

const ChatRoom = () => {
  const { user } = useAuth();
  const { room } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    if (!user) return; // Exit early if user is not defined

    // Initialize WebSocket connection
    socketRef.current = io(`${api.defaults.baseURL}`, {
      transports: ["websocket"],
    });

    // Join room on connection
    socketRef.current.emit("joinRoom", { username: user.username, room });

    // Listen for incoming messages
    socketRef.current.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // Fetch initial messages from API
    api
      .get(`/api/chat/messages/${room}`)
      .then((response) => setMessages(response.data))
      .catch((error) => toast.error("Failed to load messages"));

    return () => {
      socketRef.current.disconnect();
    };
  }, [room, user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && user) {
      // Ensure user is not null
      socketRef.current.emit("sendMessage", {
        text: message,
        username: user.username,
        room,
      });
      setMessage("");
    }
  };

  if (!user) {
    return (
      <Box w="100%" p="4">
        <Heading as="h2" size="lg" mb="4">
          Loading...
        </Heading>
      </Box>
    );
  }

  console.log("messages", messages);

  return (
    <Box w="100%" p="4">
      <Heading as="h2" size="lg" mb="4">
        Chat Room: {room}
      </Heading>
      <Box
        border="1px"
        borderColor="gray.200"
        p="4"
        mb="4"
        h="400px"
        overflowY="scroll"
      >
        <VStack spacing="4">
          {messages.map((msg, index) => (
            <HStack
              key={index}
              w="100%"
              justify={
                msg.user.username || msg.user === user.username
                  ? "flex-end"
                  : "flex-start"
              }
            >
              <Box
                bg={
                  msg.user.username || msg.user === user.username
                    ? "teal.500"
                    : "gray.200"
                }
                color={
                  msg.user.username || msg.user === user.username
                    ? "white"
                    : "black"
                }
                p="2"
                borderRadius="md"
              >
                <Text>{msg.text}</Text>
                <Text fontSize="xs">{msg.user.username || msg.user}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
      <form onSubmit={sendMessage}>
        <HStack spacing="4">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button type="submit" colorScheme="teal">
            Send
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default ChatRoom;
