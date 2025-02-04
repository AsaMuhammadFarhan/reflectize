import UserBasicLayout from "~/component/layout/UserBasicLayout";
import { requireAuth } from "~/lib/requireAuth";
import MyTopics from "~/component/user/account/MyTopics";

export const getServerSideProps = requireAuth(() => {
  return Promise.resolve({
    props: {}
  });
});

export default function UserMyTopicPage() {
  return (
    <UserBasicLayout>
      <MyTopics />
    </UserBasicLayout>
  )
}