import { Button, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import Whitebox from "./whitebox";
import { Topic } from "@prisma/client";
import Iconify from "../appComponent/asset/Iconify";
import Link from "next/link";
import LikeButton from "../user/like/LikeButton";

export default function TopicCard({
  topic,
  link = `/topic/${topic.slug}`,
}: {
  topic: Topic;
  link?: string;
}) {
  return (
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