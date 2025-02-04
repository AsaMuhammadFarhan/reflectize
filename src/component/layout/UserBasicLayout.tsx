import { Box, Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import NavbarUser from "../navbar/user";

export default function UserBasicLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Box w="100%" position="relative">
      <NavbarUser />
      <Center
        bgColor="gray.100"
        w="100%"
        p="20px"
      >
        <Box
          minH="calc(100vh - 92px)"
          maxW="430px"
          w="100%"
        >
          {children}
        </Box>
      </Center>
    </Box>
  )
}