import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Whitebox({
  children
}: {
  children?: ReactNode;
}) {
  return (
    <Box
      borderRadius="20px"
      bgColor="white"
      p="20px"
    >
      {children}
    </Box>
  )
}