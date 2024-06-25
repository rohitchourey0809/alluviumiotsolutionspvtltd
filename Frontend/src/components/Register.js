import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <MotionBox
      w={{ base: "90%", md: "400px" }}
      mx="auto"
      mt="100px"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      backgroundColor="gray.900"
      textColor="white"
    >
      <VStack spacing="6">
        <Heading as="h2" size="lg" textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl mb="4">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <MotionButton
            type="submit"
            colorScheme="teal"
            width="full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </MotionButton>
        </form>
      </VStack>
    </MotionBox>
  );
};

export default Register;
