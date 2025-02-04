import { HStack, Text, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Iconify from "~/component/appComponent/asset/Iconify";
import { api } from "~/utils/api";

export default function LikeButton({
  slug,
  likedByIds = [],
}: {
  slug: string;
  likedByIds: string[];
}) {
  const toast = useToast();
  const session = useSession();
  const isLiked = likedByIds.includes(session.data?.id ?? "");

  const invalidate = api.useContext().topic.invalidate;
  const likeTopic = api.topic.likeTopic.useMutation().mutateAsync;
  async function onClickLike() {
    try {
      await likeTopic({ slug });
      await invalidate();
    } catch (e: any) {
      toast({
        title: "Something Went Wrong",
        description: e.message ?? e ?? undefined,
        status: "error",
        position: "top",
      });
    }
  }


  return (
    <HStack>
      <Iconify
        color={isLiked ? "blackAlpha.500" : "black"}
        icon={isLiked ? "bxs:like" : "bx:like"}
        onClick={onClickLike}
        cursor="pointer"
      />
      {likedByIds.length && (
        <Text>
          {likedByIds.length}
        </Text>
      )}
    </HStack>
  )
}