import { Center, HStack, Spacer, Text } from "@chakra-ui/react";
import UserMenu from "./menu";

export default function NavbarUser() {
  return (
    <Center
      position="sticky"
      bgColor="white"
      zIndex={10}
      top="0px"
      w="100%"
      p="10px"
    >
      <HStack
        bgColor="white"
        spacing="10px"
        maxW="430px"
        w="100%"
      >
        <Text
          fontFamily="satisfy"
          fontSize="xl"
        >
          Know Myself Better
        </Text>
        <Spacer />
        <UserMenu />
      </HStack>
    </Center>
  )
}