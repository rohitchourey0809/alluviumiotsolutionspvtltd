import React from "react";
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box textAlign="center" py="10">
      <VStack spacing="6">
        <Heading as="h1" size="2xl">
          Welcome to the Chat App
        </Heading>
        <Button colorScheme="teal" as={Link} to="/login">
          Login
        </Button>
        <Button colorScheme="teal" as={Link} to="/register">
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;
