import {
  Button,
  Center,
  Flex,
  HStack,
  Input,
  PinInput,
  PinInputField,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Gender, TopicTheme } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import CustomCheckbox from "~/component/appComponent/input/checkbox";
import { objectiveQuestions, themeQuestion } from "~/utils/verification/question";
import { api } from "~/utils/api";
import Iconify from "~/component/appComponent/asset/Iconify";
import { signIn } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  return {
    props: { username }
  };
};

export default function VerificationPage({ username }: { username: string }) {
  const toast = useToast();

  const [page, setPage] = useState(1);
  const [objective, setObjective] = useState("");
  const [preferenceTheme, setPreferenceTheme] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [otp, setOtp] = useState("");

  const verifyUser = api.user.verifyToken.useMutation();
  const resendVerificationToken = api.user.resendVerificationToken.useMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (password.length < 8) {
      toast({
        status: "error",
        title: "Password Lemah!",
        description: "Panjang minimal password adalah 8 karakter",
        position: "top",
      });
      return;
    }

    try {
      const currentDate = new Date();
      setIsSubmitting(true);
      const user = await verifyUser.mutateAsync({
        username,
        token: otp,
        password,
        passwordConfirmation,
        date: currentDate,
        objective,
        preferenceTheme: preferenceTheme as TopicTheme,
        gender: gender as Gender,
        ageRange,
      });
      await signIn("login", {
        usernameOrEmail: user.email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error: any) {
      toast({
        title: "Failed",
        description: error?.message ?? error ?? "Gagal menggunakan OTP!",
        status: "error",
        position: "top",
      });
      setIsSubmitting(false);
    }
  };

  const [isResending, setIsResending] = useState(false);
  const handleResend = async () => {
    try {
      const currentDate = new Date();
      setIsResending(true);
      await resendVerificationToken.mutateAsync({
        username,
        date: currentDate,
      });
      toast({
        title: "Kode OTP akan dikirim ulang!",
        status: "info",
        position: "top",
      })
      setIsResending(false);
    } catch (error: any) {
      toast({
        title: "Failed",
        description: error?.message ?? error ?? "Gagal menggunakan OTP!",
        status: "error",
        position: "top",
      });
      setIsResending(false);
    }
  };

  const PageDisplayer = () => (
    <HStack w="100%">
      {[1, 2, 3, 4].map((num) => (
        <Flex
          bgColor={page === num ? "black" : "white"}
          borderRadius="md"
          boxSize="40px"
          key={num}
          w="100%"
          h="5px"
        />
      ))}
    </HStack>
  );

  return (
    <Center
      p={["20px", "20px", "40px"]}
      bgColor="gray.100"
      minH="100vh"
    >
      <Stack
        alignItems="center"
        spacing="40px"
        maxW="430px"
        w="100%"
      >
        <Stack>
          <Text fontSize="3xl">
            Halo {username}!
          </Text>
          <Text>
            Kami ingin memberikan pengalaman terbaik untukmu.
            Bantu kami dengan menjawab pertanyaan di bawah yaa.
          </Text>
        </Stack>
        <PageDisplayer />
        {page === 1 && (
          <Stack w="100%">
            <Text>Apa yang membuatmu ingin lebih mengenal dirimu?</Text>
            <SimpleGrid columns={[1, 2]} spacing="10px">
              {objectiveQuestions.map((theme) => (
                <CustomCheckbox
                  onClick={() => setObjective(theme.title)}
                  isActive={objective === theme.title}
                  description={theme.description}
                  title={theme.title}
                  key={theme.title}
                />
              ))}
            </SimpleGrid>
          </Stack>
        )}
        {page === 2 && (
          <Stack w="100%">
            <Text>Tema topik apa yang kamu minati?</Text>
            <SimpleGrid columns={[1, 1, 2]} spacing="10px">
              {themeQuestion.map((theme) => (
                <CustomCheckbox
                  onClick={() => setPreferenceTheme(theme.value)}
                  isActive={preferenceTheme === theme.value}
                  title={theme.title}
                  key={theme.value}
                  icon={theme.icon}
                />
              ))}
            </SimpleGrid>
          </Stack>
        )}
        {page === 3 && (
          <Stack>
            <Text>Jenis kelamin,</Text>
            <SimpleGrid columns={[1, 1, 2]} spacing="10px">
              {[
                { title: "Laki-laki", value: 'MALE', description: "Saya adalah laki-laki." },
                { title: "Perempuan", value: 'FEMALE', description: "Saya adalah perempuan." }
              ].map((g) => (
                <CustomCheckbox
                  key={g.value}
                  title={g.title}
                  description={g.description}
                  isActive={gender === g.value}
                  onClick={() => setGender(g.value)}
                />
              ))}
            </SimpleGrid>
            <Text>dan rentang usiamu.</Text>
            <SimpleGrid columns={[1, 1, 2]} spacing="10px">
              {[
                { title: "<18", description: "Di bawah 18 tahun" },
                { title: "18-24", description: "Usia 18 hingga 24 tahun" },
                { title: "25-34", description: "Usia 25 hingga 34 tahun" },
                { title: "35-44", description: "Usia 35 hingga 44 tahun" },
                { title: "45+", description: "45 tahun ke atas" }
              ].map((range) => (
                <CustomCheckbox
                  key={range.title}
                  title={range.title}
                  description={range.description}
                  isActive={ageRange === range.title}
                  onClick={() => setAgeRange(range.title)}
                />
              ))}
            </SimpleGrid>
          </Stack>
        )}
        {page === 4 && (
          <>
            <Stack w="100%">
              <Text
                fontWeight="medium"
                fontSize="xl"
              >
                Oke selangkah lagi untuk pembuatan profilmu!
              </Text>
              <Stack w="100%" alignItems="center">
                <Text>Masukkan OTP:</Text>
                <HStack>
                  <PinInput value={otp} onChange={(e) => setOtp(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Stack>
              <Text>Buat password</Text>
              <Input
                value={username}
                name="username"
                display="none"
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="new-password"
                autoComplete="off"
                value={password}
                type="password"
              />
              <Input
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Konfirmasi Password"
                value={passwordConfirmation}
                name="new-password"
                autoComplete="off"
                type="password"
              />
            </Stack>
          </>
        )}
        <HStack w="100%">
          <Button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            bgColor="white"
            color="black"
          >
            <Iconify icon="bx:chevron-left" />
          </Button>
          <Spacer />
          {page < 4 ? (
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              isDisabled={
                (page === 1 && !objective) ||
                (page === 2 && !themeQuestion) ||
                (page === 3 && (!gender || !ageRange))
              }
              color="black"
              bg="white"
            >
              <Iconify icon="bx:chevron-right" />
            </Button>
          ) : (
            <>
              <Button
                isLoading={isResending}
                onClick={handleResend}
              >
                Resend OTP
              </Button>
              <Button
                isLoading={isSubmitting}
                onClick={handleSubmit}
                color="white"
                bg="black"
              >
                Submit
              </Button>
            </>
          )}
        </HStack>
      </Stack>
    </Center >
  );
}
