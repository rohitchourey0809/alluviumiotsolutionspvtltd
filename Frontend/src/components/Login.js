import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { baseURL } from "../api";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, formData);
      localStorage.setItem("token", response.data.token);
      toast({
        title: "Login successful",
        description: "You are now logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/chat/general"); // Redirect to chat page after successful login
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <VStack spacing="4">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <MotionButton
            type="submit"
            colorScheme="teal"
            width="full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </MotionButton>
        </VStack>
      </form>
    </MotionBox>
  );
};

export default Login;
