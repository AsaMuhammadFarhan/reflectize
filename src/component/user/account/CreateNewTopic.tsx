import {
  Button,
  Center,
  Checkbox,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TopicTheme } from "@prisma/client";
import { useState } from "react";
import Iconify from "~/component/appComponent/asset/Iconify";
import Whitebox from "~/component/box/whitebox";
import { api } from "~/utils/api";
import { themeQuestion } from "~/utils/verification/question";

export default function CreateNewTopic() {

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createTopic = api.topic.createTopic.useMutation().mutateAsync;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState<TopicTheme | null>(null);
  const [preferPublication, setPreferPublication] = useState(false);

  function onClickMake() {
    setIsSubmitting(true);
    createTopic({
      title,
      description,
      theme,
      preferPublication,
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
          description: "Berhasil mengusulkan topik!",
          position: "top",
        });
      };
      onClose();
    });
    return;
  }

  return (
    <>
      <Button
        leftIcon={Iconify({ icon: "bx:plus" })}
        onClick={onOpen}
        borderRadius="10px"
      >
        Baru
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW={["0px", "0px", "600px"]}>
          <ModalHeader>
            Buat Topik Baru
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="gray.100">
            <Center w="100%">
              <Stack maxW="430px" w="100%">
                <Whitebox>
                  <Stack spacing="10px">
                    <HStack alignItems="start">
                      <Stack spacing="0px" w="100%">
                        <Input
                          onChange={e => setTitle(e.target.value)}
                          value={title}
                          placeholder="Judul Topik"
                          fontWeight="medium"
                          variant="flushed"
                          fontSize="lg"
                        />
                        <Textarea
                          onChange={e => setDescription(e.target.value)}
                          value={description}
                          placeholder="Deskripsi"
                          variant="flushed"
                        />
                      </Stack>
                      <Iconify icon="bx:bookmark" />
                    </HStack>
                    <HStack>
                      <Iconify icon="bx:like" />
                      <Spacer />
                      <Button
                        colorScheme="blackAlpha"
                        borderRadius="10px"
                        cursor="default"
                        bgColor="black"
                        color="white"
                        _hover={{}}
                        size="sm"
                      >
                        Lihat Test
                      </Button>
                    </HStack>
                  </Stack>
                </Whitebox>
                <Whitebox>
                  <Stack>
                    <Checkbox
                      onChange={e => setPreferPublication(e.target.checked)}
                      isChecked={preferPublication}
                    >
                      Minta ditampilkan untuk publik
                    </Checkbox>
                    <Stack>
                      <Text>
                        Tema (opsional)
                      </Text>
                      <RadioGroup onChange={(e) => setTheme(e as TopicTheme)}>
                        <SimpleGrid columns={2}>
                          {themeQuestion.map(tq => (
                            <Radio
                              value={tq.value}
                              key={tq.value}
                            >
                              {tq.title}
                            </Radio>
                          ))}
                        </SimpleGrid>
                      </RadioGroup>
                    </Stack>
                  </Stack>
                </Whitebox>
              </Stack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Center w="100%">
              <Button
                colorScheme="blackAlpha"
                isLoading={isSubmitting}
                onClick={onClickMake}
                bgColor="black"
                color="white"
              >
                Buat
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}