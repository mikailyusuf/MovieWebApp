import {
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Container,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import UserData from "../data/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post<UserData>("http://localhost:3000/api/auth/login", {
          email,
          password,
        })
        .then((data) => {
          console.log(data.data);
          updateUser(data.data);
          toast({
            position: "top-right",
            title: "Success.",
            description: "Login Successful.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/");
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container
      display="flex"
      justifyContent="center"
      height="100vh"
      maxW={1200}
      alignItems="center"
    >
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" width={500}>
        <Heading mb={4}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <FormControl id="username">
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
