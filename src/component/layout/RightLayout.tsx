import { Center, Flex, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import Iconify from "../appComponent/asset/Iconify";

export default function RightLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Flex
      position="relative"
      minH="100vh"
      w="100%"
    >
      <Flex
        display={["none", "none", "flex"]}
        position="relative"
        minH="100vh"
        h="100%"
        w="100%"
      >
        <Stack
          borderRightWidth="thin"
          position="absolute"
          spacing="10px"
          w="100%"
          h="100%"
          p="20px"
        >
          <HStack spacing="10px">
            <Iconify
              icon="bxs:leaf"
              boxSize="24px"
            />
            <Text fontWeight="bold">
              WhiteLabel
            </Text>
          </HStack>
          <Spacer />
          <Text fontSize="lg">
            "You become what you believe."
          </Text>
          <Text>
            - Oprah Winfrey
          </Text>
        </Stack>
      </Flex>
      <Center
        minH="100vh"
        h="100%"
        w="100%"
        p="40px"
      >
        {children}
      </Center>
    </Flex>
  )
}