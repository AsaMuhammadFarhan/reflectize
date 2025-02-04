import { Center, Link, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Iconify from "../asset/Iconify";

export default function ShareComponent({
  text = "Share this page"
}:{
  text?: string;
}) {
  const router = useRouter();
  const currentPath = process.env.NEXT_PUBLIC_WEB_URL + router.asPath;
  return (
    <Stack>
      <Text fontSize="sm">
        {text}
      </Text>
      <Wrap>
        <WrapItem>
          <Link
            href={`https://www.facebook.com/share.php?u=${currentPath}`}
            target="_blank"
            rounded="full"
          >
            <Center
              bgColor="facebook.700"
              boxSize="24px"
              rounded="full"
            >
              <Iconify
                icon="bxl:facebook"
                color="white"
              />
            </Center>
          </Link>
        </WrapItem>
        <WrapItem>
          <Link
            href={`https://twitter.com/share?&url=${currentPath}&hastags=Hydrostatic`}
            target="_blank"
            rounded="full"
          >
            <Center
              bgColor="twitter.700"
              boxSize="24px"
              rounded="full"
            >
              <Iconify
                icon="bxl:twitter"
                color="white"
              />
            </Center>
          </Link>
        </WrapItem>
        <WrapItem>
          <Link
            href={`https://threads.net/intent/post?text=${currentPath}`}
            target="_blank"
            rounded="full"
          >
            <Center
              bgColor="black"
              boxSize="24px"
              rounded="full"
            >
              <Iconify
                icon="mage:threads"
                color="white"
              />
            </Center>
          </Link>
        </WrapItem>
      </Wrap>
    </Stack>
  )
}