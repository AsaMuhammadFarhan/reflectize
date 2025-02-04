import { HStack, Stack, Text } from "@chakra-ui/react";
import Whitebox from "~/component/box/whitebox";
import { api } from "~/utils/api";
import CreateNewTopic from "./CreateNewTopic";
import TopicCard from "~/component/box/TopicCard";

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
        <TopicCard
          key={topic.id}
          topic={topic}
          showStatus
        />
      ))}
    </Stack>
  )
}