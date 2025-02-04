import { GetServerSideProps } from "next";
import UserBasicLayout from "~/component/layout/UserBasicLayout";
import PublicTopics, { PublicTopicsGeneralData } from "~/component/user/PublicTopics";
import { prisma } from "~/server/db";

export const getServerSideProps: GetServerSideProps = async () => {
  const publicTopics = await prisma.topic.findMany({
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
  const topics: PublicTopicsGeneralData[] = publicTopics.map((topic) => ({
    title: topic.title,
    description: topic.description,
    slug: topic.slug,
    likedByIds: topic.likedByIds,
    theme: topic.theme,
  }));

  return {
    props: {
      topics,
    },
  };
};

const IndexPage = ({
  topics = []
}: {
  topics: PublicTopicsGeneralData[],
}) => {
  return (
    <UserBasicLayout>
      <PublicTopics ssrTopics={topics} />
    </UserBasicLayout>
  );
};

export default IndexPage;
