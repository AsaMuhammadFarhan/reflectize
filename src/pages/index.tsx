import { Topic } from "@prisma/client";
import { GetServerSideProps } from "next";
import UserBasicLayout from "~/component/layout/UserBasicLayout";
import PublicTopics from "~/component/user/PublicTopics";
import { prisma } from "~/server/db";

export const getServerSideProps: GetServerSideProps = async () => {
  const topics = await prisma.topic.findMany({
    where: {
      AND: [
        {
          publishedAt: { not: null },
        },
        {
          preferPublication: true,
        },
      ],
    },
    take: 10,
    skip: 0,
    orderBy: {
      createdAt: "desc",
    },
  });

  const ssrTopics = JSON.stringify(topics);

  return {
    props: {
      ssrTopics,
    },
  };
};

const IndexPage = ({
  ssrTopics,
}: {
  ssrTopics: string,
}) => {

  const topics: Topic[] = JSON.parse(ssrTopics);

  return (
    <UserBasicLayout>
      <PublicTopics ssrTopics={topics} />
    </UserBasicLayout>
  );
};

export default IndexPage;
