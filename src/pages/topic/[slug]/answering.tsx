import { Button, HStack, Skeleton, Stack, Text, useToast } from "@chakra-ui/react";
import { Question, Topic, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Whitebox from "~/component/box/whitebox";
import UserBasicLayout from "~/component/layout/UserBasicLayout";
import { requireAuth } from "~/lib/requireAuth";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
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

  if (!ssrTopic) return {
    props: {
      ssrTopic: null,
      ssrQuestions: null,
    }
  }

  const ssrQuestions = await prisma.question.findMany({
    where: {
      topicId: ssrTopic?.id
    },
    orderBy: {
      order: "asc"
    }
  })

  return {
    props: {
      ssrTopic: JSON.stringify(ssrTopic),
      ssrQuestions: ssrQuestions ? JSON.stringify(ssrQuestions) : null,
    }
  };
});

export default function TopicDetailPage({
  ssrTopic,
  ssrQuestions,
}: {
  ssrTopic: string | null;
  ssrQuestions: string | null;
}) {
  const toast = useToast();
  const router = useRouter();

  const topic: (Topic & { creator: User; }) | null = ssrTopic ? JSON.parse(ssrTopic) : null;
  const questions: Question[] = ssrQuestions ? JSON.parse(ssrQuestions) : [];

  const createTopicLog = api.topicLog.createTopicLog.useMutation().mutateAsync;
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onClickAnswer(value: number, index: number) {
    setAnswers(prev => {
      const temp = [...prev];
      if (temp.length < index) {
        for (let i = 0; i < questions.length; i++) {
          temp.push(null);
        }
      }
      temp[index] = value;
      return temp;
    })
  }
  function onSubmit() {
    if (!topic) return;
    setIsSubmitting(true);
    createTopicLog({
      topicId: topic.id,
      answers,
    }).catch(e => {
      setIsSubmitting(false);
      toast({
        status: "error",
        title: "Something went wrong",
        description: e?.message ? e.message : e,
        position: "top",
      })
    }).then((result) => {
      if (result) {
        toast({
          status: "success",
          title: "Success!",
          description: "Jawaban berhasil dikirim!",
          position: "top",
        });
        router.replace(`/account/log?highlight=${result.id}`)
      }
    });
  }
  useEffect(() => {
    if (questions.length > 0) {
      setAnswers(Array(questions.length).fill(null));
    }
  }, [questions]);

  return (
    <UserBasicLayout>
      <Stack>
        <Whitebox>
          <Stack>
            <Text textAlign="justify">
              Berikut adalah pertanyaan untuk <Text as="span" fontWeight="medium">"{topic?.title}"</Text>.
              Silahkan jawab ya atau tidak berdasarkan mana yang paling cocok menggambarkan diri Anda!
            </Text>
          </Stack>
        </Whitebox>
        <Stack>
          {questions.length > 0 ? questions.map((question, index) => (
            <Whitebox>
              <Stack>
                <HStack
                  alignItems="start"
                  spacing="10px"
                >
                  <Text>
                    {index + 1}.
                  </Text>
                  <Text textAlign="justify">
                    {question.question}
                  </Text>
                </HStack>
                <HStack>
                  {question.options.map((option, optionIndex) => (
                    <Button
                      _hover={{
                        bgColor: "black",
                        color: "white",
                      }}
                      bgColor={answers[index] === optionIndex ? "black" : "white"}
                      color={answers[index] === optionIndex ? "white" : "black"}
                      onClick={() => onClickAnswer(optionIndex, index)}
                      variant="outline"
                      size="sm"
                      w="100%"
                    >
                      {option}
                    </Button>
                  ))}
                </HStack>
              </Stack>
            </Whitebox>
          )) : (
            <>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
              <Skeleton borderRadius="20px">
                <Whitebox>
                  <Text>A</Text>
                </Whitebox>
              </Skeleton>
            </>
          )}
          <Button
            isDisabled={answers.some(a => a === null) || answers.length === 0}
            isLoading={isSubmitting}
            colorScheme="blackAlpha"
            borderRadius="20px"
            onClick={onSubmit}
            bgColor="black"
            color="white"
          >
            Kirim
          </Button>
        </Stack>
      </Stack>
    </UserBasicLayout>
  )
}