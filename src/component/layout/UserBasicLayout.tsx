import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import NavbarUser from "../navbar/user";

export default function UserBasicLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Box w="100%">
      <NavbarUser />
      {children}
    </Box>
  )
}