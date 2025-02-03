import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function isAuthWithRole(slug: string, fallbackUrl?: string) {
  const router = useRouter();
  const session = useSession();
  if (session.status === "loading") return;
  if (!session || (session.data?.user && slug !== session.data?.user.slug)) router.replace(fallbackUrl ?? "/");
}