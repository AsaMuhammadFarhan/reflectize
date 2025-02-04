import { Button, HStack, Spacer, Stack, Tag, Text } from "@chakra-ui/react";
import Whitebox from "./whitebox";
import { Topic } from "@prisma/client";
import Iconify from "../appComponent/asset/Iconify";
import Link from "next/link";
import LikeButton from "../user/like/LikeButton";

export default function TopicCard({
  topic,
  link = `/topic/${topic.slug}`,
  showStatus = false,
}: {
  topic: Topic;
  link?: string;
  showStatus?: boolean;
}) {
  function PublishStatus() {
    if (!showStatus) return <></>
    if (!topic.preferPublication) return (
      <Tag w="fit-content">
        Private
      </Tag>
    );
    if (!topic.publishedAt) return (
      <Tag colorScheme="blue" w="fit-content">
        Requested
      </Tag>
    );
    return (
      <Tag colorScheme="green" w="fit-content">
        Public
      </Tag>
    );
  }

  return (
    <Whitebox key={topic.slug}>
      <Stack spacing="10px">
        <PublishStatus />
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
          <LikeButton
            likedByIds={topic.likedByIds}
            slug={topic.slug}
          />
          <Spacer />
          <Link
            prefetch={false}
            href={link}
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
  )
}