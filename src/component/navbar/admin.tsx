import { Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavbarAdmin() {

  const router = useRouter();
  const pathname = router.pathname;

  const menus = [
    {
      label: "Dashboard",
      link: "/",
    },
  ];

  return (
    <HStack>
      {menus.map(menu => (
        <Link
          key={menu.label}
          href={menu.link}
        >
          <Button
            bgColor={pathname === menu.link ? "black" : undefined}
            color={pathname === menu.link ? "white" : "black"}
          >
            {menu.label}
          </Button>
        </Link>
      ))}
    </HStack>
  )
}