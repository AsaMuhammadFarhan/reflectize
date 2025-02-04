import { Button, Stack } from "@chakra-ui/react";
import Link from "next/link";
import Iconify from "~/component/appComponent/asset/Iconify";
import Whitebox from "~/component/box/whitebox";
import UserBasicLayout from "~/component/layout/UserBasicLayout";
import { requireAuth } from "~/lib/requireAuth";

export const getServerSideProps = requireAuth((context) => {
  const { logId } = context.query;
  return Promise.resolve({
    props: { logId }
  });
});

export default function UserLogDetailPage() {



  return (
    <UserBasicLayout>
      <Stack>
        <Link
          style={{
            width: "fit-content",
            borderRadius: "20px",
          }}
          href="/account/log"
        >
          <Button
            borderRadius="20px"
            bgColor="white"
            w="fit-content"
            color="black"
          >
            <Iconify
              icon="bx:left-arrow-alt"
            />
          </Button>
        </Link>
        <Whitebox>

        </Whitebox>
      </Stack>
    </UserBasicLayout>
  )
}