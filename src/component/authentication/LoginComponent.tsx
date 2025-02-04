import { Button, Divider, HStack, Input, Link, Stack, Text, useBoolean, useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import RegisterPopup from "./RegisterPopup";

export default function LoginComponent() {
  const toast = useToast();
  const router = useRouter();

  const [isSigning, setIsSigning] = useBoolean();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onClickLogin() {
    setIsSigning.on();
    const response = await signIn("login", {
      usernameOrEmail: email.toLowerCase().trim(),
      password,
      redirect: false,
    });
    setIsSigning.off();
    if (response?.error) {
      const errorMessage = await JSON.parse(response.error);
      toast({
        status: "error",
        title: "Invalid Credentials",
        position: "top",
        description: Array.isArray(errorMessage) ? errorMessage.map(e => e.message).join("; ") : response.error
      });
      return
    }
    router.push("/");
  }

  return (
    <>
      <Stack
        onSubmit={e => e.preventDefault()}
        alignItems="center"
        spacing="20px"
        maxW="400px"
        as="form"
        w="100%"
      >
        <Stack
          alignItems="center"
          textAlign="center"
          w="100%"
        >
          <Text
            fontWeight="bold"
            fontSize="3xl"
          >
            Sign in to <br /> <Text as="span" fontFamily="satisfy">Know Myself Better</Text>
          </Text>
          <Text color="blackAlpha.500">
            Enter your email and password below to log in to your account
          </Text>
        </Stack>

        <Stack
          spacing="5px"
          w="100%"
        >
          <Input
            onChange={e => setEmail(e.target.value)}
            placeholder="name@example.com"
            name="username"
            value={email}
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            value={password}
            type="password"
            name="password"
          />
        </Stack>

        <Button
          colorScheme="blackAlpha"
          onClick={onClickLogin}
          isLoading={isSigning}
          fontWeight="medium"
          bgColor="gray.900"
          type="submit"
          w="100%"
        >
          Sign In
        </Button>

        <Text
          color="blackAlpha.500"
          textAlign="center"
          fontSize="sm"
        >
          By signing in, you agree to our <Link
            // href="/term-and-service"
            color="blackAlpha.900"
            fontWeight="medium"
          >Terms of Service</Link> and <Link
            // href="/privacy-policy"
            color="blackAlpha.900"
            fontWeight="medium"
          >
            Privacy Policy
          </Link>.
        </Text>

        <HStack w="100%">
          <Divider w="100%" />
          <Text>OR</Text>
          <Divider w="100%" />
        </HStack>

        <RegisterPopup />
      </Stack>
    </>
  )
}