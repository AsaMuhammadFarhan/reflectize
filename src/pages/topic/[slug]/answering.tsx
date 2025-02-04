import { Button, HStack, Skeleton, Stack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Whitebox from "~/component/box/whitebox";
import UserBasicLayout from "~/component/layout/UserBasicLayout";
import { requireAuth } from "~/lib/requireAuth";
import { api } from "~/utils/api";

export const getServerSideProps = requireAuth((context) => {
  const { slug } = context.query;
  return Promise.resolve({
    props: { slug }
  });
});

export default function TopicDetailPage({
  slug,
}: {
  slug: string;
}) {
  const toast = useToast();
  const router = useRouter();

  const topic = api.topic.publicTopicBySlug.useQuery({ slug }).data;
  const questions = api.question.questionsByTopicSlug.useQuery({ slug }).data ?? [];
  const createTopicLog = api.topicLog.createTopicLog.useMutation().mutateAsync;

  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onClickAnswer(value: boolean, index: number) {
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
                  <Button
                    _hover={{
                      bgColor: "black",
                      color: "white",
                    }}
                    bgColor={answers[index] === false ? "black" : "white"}
                    color={answers[index] === false ? "white" : "black"}
                    onClick={() => onClickAnswer(false, index)}
                    variant="outline"
                    size="sm"
                    w="100%"
                  >
                    Tidak
                  </Button>
                  <Button
                    _hover={{
                      bgColor: "black",
                      color: "white",
                    }}
                    bgColor={answers[index] === true ? "black" : "white"}
                    color={answers[index] === true ? "white" : "black"}
                    onClick={() => onClickAnswer(true, index)}
                    variant="outline"
                    size="sm"
                    w="100%"
                  >
                    Ya
                  </Button>
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