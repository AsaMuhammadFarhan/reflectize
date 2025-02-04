import { Button, Center, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { TopicTheme } from "@prisma/client";
import Whitebox from "../box/whitebox";
import Iconify from "../appComponent/asset/Iconify";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";

export type PublicTopicsGeneralData = {
  title: string;
  description: string | null;
  slug: string;
  likedByIds: string[];
  theme: TopicTheme | null;
}

export default function PublicTopics({
  ssrTopics,
}: {
  ssrTopics: PublicTopicsGeneralData[];
}) {

  const [topics, setTopics] = useState(ssrTopics ?? []);
  const [page, setPage] = useState(0);

  const countPublicTopics = api.topic.countPublicTopics.useQuery({}).data ?? 0;
  const [isFetching, setIsFetching] = useState(false);
  const getPublicBlogs = api.topic.getPublicTopics.useMutation().mutateAsync;
  const isDisabled = isFetching;
  const isHide = topics.length >= countPublicTopics;
  function fetchAndAddTopics() {
    setIsFetching(true);
    getPublicBlogs({
      limit: 10,
      page: page + 1,
    }).then(result => {
      setPage(prev => prev + 1);
      setTopics(prev => {
        const temp = [...prev];
        const newTopics: PublicTopicsGeneralData[] = result.map((topic) => ({
          title: topic.title,
          description: topic.description,
          slug: topic.slug,
          likedByIds: topic.likedByIds,
          theme: topic.theme,
        }));
        for (const topic of newTopics) {
          temp.push(topic);
        }
        return temp;
      });
      setIsFetching(false);
    })
  }

  return (
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
      <Center w="100%">
        <Button
          display={isHide ? "none" : undefined}
          onClick={fetchAndAddTopics}
          colorScheme="blackAlpha"
          isDisabled={isDisabled}
          variant="outline"
        >
          Lihat Lainnya
        </Button>
      </Center>
    </Stack>
  )
}