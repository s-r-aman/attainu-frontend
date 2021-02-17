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
  Code,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const [cities, setCites] = useState([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({ title: "Please login", status: "error" });
      return router.push("/log-in");
    }
    axios
      .post("http://localhost:4000/api/users/get-cities", { token })
      .then((res) => {
        setCites(res.data);
      })
      .catch((err) => {
        toast({ title: err?.message, status: "error" });
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <Container>
      <Heading>Hello Attain U!</Heading>
      <Button colorScheme="red" onClick={logout}>
        Log Out
      </Button>
      <SimpleGrid mt="50px" columns={2} spacing={5}>
        <Heading>Name</Heading>
        <Heading>State</Heading>
        {cities.map(({ name, state }) => (
          <>
            <Text>{name}</Text>
            <Text>{state}</Text>
          </>
        ))}
      </SimpleGrid>
    </Container>
  );
}
