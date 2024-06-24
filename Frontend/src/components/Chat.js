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
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../api"; // Import the api module

const Chat = () => {
  const { user } = useAuth();
  const { room } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // Connect to the Socket.io server
    socketRef.current = io("https://backend-alluvuim.vercel.app");

    // Emit joinRoom event when component mounts
    socketRef.current.emit("joinRoom", { username: user.username, room });

    // Listen for incoming messages
    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Fetch existing messages for the room using axios
    api
      .get(`/api/chat/messages/${room}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Failed to load messages", error);
      });

    // Cleanup on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [room, user.username]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        user: user.username,
        text: message,
      };
      // Emit sendMessage event to the server
      socketRef.current.emit("sendMessage", { message: newMessage, room });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

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
              justify={msg.user === user.username ? "flex-end" : "flex-start"}
            >
              <Box
                bg={msg.user === user.username ? "teal.500" : "gray.200"}
                color={msg.user === user.username ? "white" : "black"}
                p="2"
                borderRadius="md"
              >
                <Text>{msg.text}</Text>
                <Text fontSize="xs">{msg.user}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
      <form onSubmit={handleSendMessage}>
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

export default Chat;
