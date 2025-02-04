import { Button, Center, Stack } from "@chakra-ui/react";
import { Topic } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import TopicCard from "../box/TopicCard";

export default function PublicTopics({
  ssrTopics,
}: {
  ssrTopics: Topic[];
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
    }).then(newTopics => {
      setPage(prev => prev + 1);
      setTopics(prev => {
        const temp = [...prev];
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
        <TopicCard
          key={topic.id}
          topic={topic}
        />
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