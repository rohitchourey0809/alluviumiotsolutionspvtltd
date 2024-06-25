import React from 'react';
import { Box, VStack, Button, Heading } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ChatRoom from '../components/ChatRoom';

const ChatPage = () => {
  const { user, logout } = useAuth();
  const { room } = useParams();

  console.log("user", user);

  return (
    <Box p="4" backgroundColor="gray.900">
      <VStack spacing="4" >
        <Heading as="h1" textColor="white">
          Welcome, {user?.username}
        </Heading>
        <Button colorScheme="red" onClick={logout}>
          Logout
        </Button>
        <Button colorScheme="teal" as={Link} to={`/chat/${room}`}>
          Join Chat Room
        </Button>
        <ChatRoom />
      </VStack>
    </Box>
  );
};

export default ChatPage;
