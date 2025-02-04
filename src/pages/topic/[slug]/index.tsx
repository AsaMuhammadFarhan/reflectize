import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { Topic, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import Iconify from "~/component/appComponent/asset/Iconify";
import ShareComponent from "~/component/appComponent/share";
import Whitebox from "~/component/box/whitebox";
import UserBasicLayout from "~/component/layout/UserBasicLayout";
import { requireAuth } from "~/lib/requireAuth";
import { prisma } from "~/server/db";
import { getRouterQueryAsString } from "~/utils/router";

export const getServerSideProps = requireAuth(async (context) => {
  const { slug } = context.query;
  const ssrTopic = await prisma.topic.findFirst({
    where: {
      slug: getRouterQueryAsString(slug),
      publishedAt: {
        not: null,
      },
    },
    include: {
      creator: true,
    }
  });

  return {
    props: {
      slug,
      ssrTopic: ssrTopic ? JSON.stringify(ssrTopic) : null,
    }
  };
});

export default function TopicDetailPage({
  slug,
  ssrTopic,
}: {
  slug: string;
  ssrTopic: string | null;
}) {

  const router = useRouter();
  const topic: (Topic & { creator: User; }) | null = ssrTopic ? JSON.parse(ssrTopic) : null;

  function onClickStart() {
    router.push(`/topic/${slug}/answering`);
    return;
  }

  return (
    <UserBasicLayout>
      <Stack>
        <Link
          style={{
            width: "fit-content",
            borderRadius: "20px",
          }}
          href="/"
        >
          <Button
            borderRadius="20px"
            bgColor="white"
            w="fit-content"
            color="black"
          >
            <Iconify
              icon="bx:left-arrow-alt"
            />
          </Button>
        </Link>
        <Whitebox>
          <Stack spacing="20px">
            <HStack alignItems="start">
              <Stack spacing="5px" w="100%">
                <Text fontSize="sm" color="blackAlpha.500">
                  Diinisiasi oleh {topic?.creator.name}
                </Text>
                <Text
                  fontWeight="medium"
                  fontSize="lg"
                >
                  {topic?.title}
                </Text>
                <Text color="blackAlpha.500">
                  {topic?.description || "tidak ada deskripsi yang dicantumkan."}
                </Text>
              </Stack>
              <Iconify
                icon="bx:bookmark"
                cursor="pointer"
              />
            </HStack>
            <HStack>
              <Iconify
                cursor="pointer"
                icon="bx:like"
              />
            </HStack>
            <Button
              colorScheme="blackAlpha"
              onClick={onClickStart}
              borderRadius="10px"
              bgColor="black"
              color="white"
              size="sm"
              w="100%"
            >
              Mulai Kerjakan
            </Button>
            <ShareComponent />
          </Stack>
        </Whitebox>
        <Whitebox>
          <Text>
            Komentar (12)
          </Text>
        </Whitebox>
      </Stack>
    </UserBasicLayout>
  )
}