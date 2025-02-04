import { Avatar, Button, Flex, HStack, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import Iconify from "../../appComponent/asset/Iconify";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactNode } from "react";

type Menu = {
  name: string;
  icon?: string;
  link?: string;
  isDisabled?: boolean;
  children?: ReactNode;
}

type Group = {
  name: string;
  menus: Menu[];
}

export default function UserMenu() {
  const session = useSession();
  const router = useRouter();

  const groups: Group[] = [
    {
      name: "Explore",
      menus: [
        {
          name: "Beranda",
          icon: "bxs:book-content",
          link: "/",
        },
      ],
    },
    {
      name: "Akun",
      menus: [
        // {
        //   name: "Topik Saya",
        //   icon: "bxs:user",
        //   link: "",
        //   isDisabled: true,
        // },
        {
          name: "Hasil Analisis",
          icon: "bxs:user-detail",
          link: "/account/log",
        },
        // {
        //   name: "Topik Tersimpan",
        //   icon: "bxs:bookmark",
        //   link: "",
        //   isDisabled: true,
        // },
        {
          name: "Topik Saya",
          children: <MenuItem
            onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
            icon={Iconify({ icon: "bxs:log-out" })}
            fontWeight="medium"
            color="red.500"
          >
            Keluar
          </MenuItem>
        },
      ],
    },
  ]

  if (!session.data?.id) return (
    <Link href="/login">
      <Button
        variant="outline"
      >
        Login
      </Button>
    </Link>
  );

  return (
    <Menu>
      <MenuButton as={Button}
        w="fit-content"
        h="fit-content"
        rounded="full"
        minW="0px"
        p="0px"
      >
        <Avatar
          borderColor="blackAlpha.500"
          name={session.data?.user.name}
          borderWidth="thin"
          bgColor="white"
          color="black"
          size="sm"
        />
      </MenuButton>
      <MenuList p="10px" borderRadius="20px" fontFamily="geist">
        <HStack>
          <Avatar
            borderColor="blackAlpha.500"
            name={session.data?.user.name}
            borderWidth="thin"
            bgColor="white"
            color="black"
          />
          <Stack spacing="0px">
            <Text fontSize="md" fontWeight="bold">
              {session.data.user.name}
            </Text>
            <Text fontSize="sm">
              {session.data.user.email}
            </Text>
          </Stack>
        </HStack>
        {groups.map((group) => (
          <Fragment key={group.name}>
            <MenuDivider />
            <MenuGroup
              textTransform="uppercase"
              color="blackAlpha.500"
              letterSpacing="2px"
              title={group.name}
              fontWeight="bold"
              fontSize="xs"
            >
              {group.menus.map(menu => (
                <Fragment key={menu.name}>
                  {menu.children !== undefined ? menu.children : <></>}
                  {menu.link !== undefined ? (
                    <Link href={menu.link}>
                      <MenuItem
                        icon={menu.icon ? Iconify({ icon: menu.icon }) : <Flex boxSize="16px" />}
                        fontWeight={router.pathname === menu.link ? "semibold" : "normal"}
                        isDisabled={menu.isDisabled}
                      >
                        {menu.name}
                      </MenuItem>
                    </Link>
                  ) : <></>}
                </Fragment>
              ))}
            </MenuGroup>
          </Fragment>
        ))}
      </MenuList>
    </Menu>
  )
}