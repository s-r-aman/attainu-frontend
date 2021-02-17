import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  useToast,
  Link,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const [input, setInput] = useState({ username: "", password: "" });
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast({ title: "Already Logged In", status: "success" });
      return router.push("/cities");
    }
  }, []);

  const changeHandler = (field: string) => (e) => {
    setInput((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (input.password === "" || input.username === "") {
      toast({ title: "Please dont leave fields empty!", status: "error" });
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/api/users/sign-in",
        input
      );
      localStorage.setItem("token", res.data.token);
      router.push("/cities");
      toast({ title: "Logged IN!", status: "success" });
    } catch (error) {
      toast({ title: error?.message, status: "error" });
    }
  };
  return (
    <Container>
      <Heading>Hello Attain U!</Heading>
      <Heading size="md" mb="10px" mt="50px">
        Log In!
      </Heading>
      <Box as="form" onSubmit={submitForm}>
        <FormControl id="email">
          <FormLabel>Username</FormLabel>
          <Input type="text" onChange={changeHandler("username")} />
        </FormControl>
        <FormControl id="password">
          <FormLabel mt="10px">Password</FormLabel>
          <Input type="password" onChange={changeHandler("password")} />
        </FormControl>
        <Button mt="10px" width="100%" type="submit">
          Log In
        </Button>
      </Box>
      <Text mt="50px">
        Need to sign up?{" "}
        <Link textDecor="underline" color="blue" as={NextLink} href="/log-in">
          Create an account
        </Link>{" "}
      </Text>
    </Container>
  );
}
