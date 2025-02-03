import { Center, HStack, Link, Spacer, Text } from "@chakra-ui/react";
import Iconify from "../appComponent/asset/Iconify";
import NextLink from "next/link";

export default function NavbarUser() {

  const menus = [
    {
      label: "Dashboard",
      url: "/",
    },
  ];

  return (
    <Center p="20px">
      <HStack
        spacing="20px"
        maxW="1000px"
        w="100%"
      >
        <Iconify
          icon="bxs:leaf"
          boxSize="24px"
        />
        <Text fontWeight="bold">
          WhiteLabel
        </Text>
        <Spacer />
        {menus.map(menu => (
          <NextLink
            key={menu.label}
            href={menu.url}
            legacyBehavior
            passHref
          >
            <Link>
              {menu.label}
            </Link>
          </NextLink>
        ))}
      </HStack>
    </Center>
  )
}