import { Button, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Iconify from "~/component/appComponent/asset/Iconify";
import Whitebox from "~/component/box/whitebox";
import { api } from "~/utils/api";
import CreateNewTopic from "./CreateNewTopic";

export default function MyTopics() {
  const count = api.topic.countMyTopic.useQuery({}).data ?? 0;
  const topics = api.topic.myTopics.useQuery({}).data ?? [];

  return (
    <Stack>
      <Whitebox>
        <HStack justify="space-between">
          <Text>
            Topik yang Kamu Inisiasi ({count})
          </Text>
          <CreateNewTopic />
        </HStack>
      </Whitebox>
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
  )
}