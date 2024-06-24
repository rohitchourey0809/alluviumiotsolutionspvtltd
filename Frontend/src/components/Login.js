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
import axios from "axios";
import { baseURL } from "../api";

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
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        formData
      );
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
    <Box w="100%" p="4">
      <Heading as="h2" size="lg" mb="4">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
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
          <Button type="submit" colorScheme="teal">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
