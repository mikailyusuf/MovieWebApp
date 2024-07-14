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

const dummyAvatar =
  "https://images.pexels.com/photos/8348742/pexels-photo-8348742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post<UserData>("http://localhost:3000/api/auth/signup", {
          email,
          password,
          fullname,
          avatar: dummyAvatar,
        })
        .then((data) => {
          console.log(data.data);
          updateUser(data.data);
          toast({
            position: "top-right",
            title: "Success.",
            description: "Signup Successful.",
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
        <Heading mb={4}>Signup</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <FormControl id="username">
              <FormLabel>Fullname</FormLabel>
              <Input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </FormControl>
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
              Signup
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
