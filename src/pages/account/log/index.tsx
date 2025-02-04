import { Button, HStack, Stack, Tag, Text } from "@chakra-ui/react";
import Whitebox from "~/component/box/whitebox";
import UserBasicLayout from "~/component/layout/UserBasicLayout";
import { requireAuth } from "~/lib/requireAuth";
import { api } from "~/utils/api";
import moment from "moment";
import { useState } from "react";
import Link from "next/link";

export const getServerSideProps = requireAuth((context) => {
  const { highlight } = context.query;
  return Promise.resolve({
    props: {
      highlight: highlight ?? null
    }
  });
});

export default function UserLogsPage({
  highlight,
}: {
  highlight: string | null
}) {

  const countUserTopicLogs = api.topicLog.countUserTopicLogs.useQuery().data ?? 0;
  const userTopicLogs = api.topicLog.userTopicLogs.useQuery({}).data ?? [];

  const [openedIds, setOpenedIds] = useState<string[]>([]);
  function openFeedback(id: string) {
    setOpenedIds(prev => {
      const temp = [...prev];
      temp.push(id);
      return temp;
    })
  }

  return (
    <UserBasicLayout>
      <Stack>
        {/* USER ACCOUNT */}
        <Whitebox>
          <Text>
            Hasil analisis diri kamu ({countUserTopicLogs})
          </Text>
        </Whitebox>
        {userTopicLogs.map(log => (
          <Whitebox key={log.id}>
            <Stack>
              <HStack>
                <Text
                  color="blackAlpha.500"
                  fontSize="sm"
                >
                  {moment(log.createdAt).calendar()}
                </Text>
                {highlight === log.id && (
                  <Tag>
                    Highlight
                  </Tag>
                )}
              </HStack>
              <Text
                fontWeight="medium"
                fontSize="lg"
              >
                {log.topic.title}
              </Text>
              <Text
                noOfLines={openedIds.includes(log.id) || highlight === log.id ? undefined : 4}
              >
                {log.analysis.feedback}
              </Text>
              {openedIds.includes(log.id) || highlight === log.id ? <></> : (
                <Button
                  onClick={() => openFeedback(log.id)}
                  variant="outline"
                  size="sm"
                >
                  selengkapnya
                </Button>
              )}
            </Stack>
          </Whitebox>
        ))}
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            w="100%"
          >
            Cari Topik Lain?
          </Button>
        </Link>
      </Stack>
    </UserBasicLayout>
  )
}