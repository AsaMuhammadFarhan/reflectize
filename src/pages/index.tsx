import { Button, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Iconify from "~/component/appComponent/asset/Iconify";
import Whitebox from "~/component/box/whitebox";
import UserBasicLayout from "~/component/layout/UserBasicLayout";
import { api } from "~/utils/api";

const IndexPage = () => {
  const topics = api.topic.publicTopics.useQuery({ limit: 50 }).data ?? [];
  return (
    <UserBasicLayout>
      <Stack>
        {topics.map(topic => (
          <Whitebox key={topic.slug}>
            <Stack spacing="10px">
              <HStack alignItems="start">
                <Stack spacing="0px" w="100%">
                  <Text
                    fontWeight="medium"
                    fontSize="lg"
                    noOfLines={2}
                  >
                    {topic.title}
                  </Text>
                  <Text
                    color="blackAlpha.500"
                    noOfLines={3}
                  >
                    {topic.description}
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
                <Spacer />
                <Link
                  href={`/topic/${topic.slug}`}
                  prefetch={false}
                >
                  <Button
                    colorScheme="blackAlpha"
                    borderRadius="10px"
                    bgColor="black"
                    color="white"
                    size="sm"
                  >
                    Lihat Test
                  </Button>
                </Link>
              </HStack>
            </Stack>
          </Whitebox>
        ))}
      </Stack>
    </UserBasicLayout>
  );
};

export default IndexPage;
