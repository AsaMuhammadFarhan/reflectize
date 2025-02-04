import { Button, Center, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

export default function RegisterPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const createUser = api.user.createUser.useMutation().mutateAsync;

  function onClickSubmit() {
    setIsSubmitting(true);
    createUser({
      date: new Date(),
      name,
      email
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
          description: "Kode OTP akan segera dikirim",
          position: "top",
        });
        router.replace(`/verification/${result.username}`)
      }
    });
    return;
  }

  return (
    <>
      <Button onClick={onOpen}>
        Create an Account
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW={["0px", "0px", "600px"]}>
          <ModalHeader>
            New Account
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="10px">
              <Stack spacing="5px">
                <Text fontSize="xs" color="blackAlpha.500" fontWeight="medium">
                  Name
                </Text>
                <Input
                  onChange={e => setName(e.target.value)}
                  placeholder="eg. Asa Farhan"
                  name="name"
                  value={name}
                />
              </Stack>
              <Stack spacing="5px">
                <Text fontSize="xs" color="blackAlpha.500" fontWeight="medium">
                  Email
                </Text>
                <Input
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  name="email"
                  value={email}
                />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Center w="100%">
              <Button
                isDisabled={!name || !email}
                colorScheme="blackAlpha"
                isLoading={isSubmitting}
                onClick={onClickSubmit}
                bgColor="black"
              >
                Send Verification Code
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}