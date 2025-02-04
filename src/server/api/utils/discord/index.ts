import { Topic } from "@prisma/client";
import axios from "axios";

const KOCHENK_WEBHOOK =
  "https://discord.com/api/webhooks/1335874652135751780/OG5KGsZzcowWMorephXxlHoCuCiSf1a4YUGMgB2MjbYYtEZXQFuOiCFAB9GoRMmCLtB1";

export async function callDiscord(content: string) {
  await axios.post(KOCHENK_WEBHOOK, {
    content,
  });
}

export function getTemplateNewTopic({
  topic,
  name,
  userId,
}: {
  topic: Topic;
  name: string;
  userId: string;
}) {
  return `**TOPIC INITIATED**
\`\`\`
title  : ${topic.title}
slug   : ${topic.slug}
theme  : ${topic.theme}
public : ${topic.preferPublication ? "yes" : "no"}
creator: ${name} (${userId})
\`\`\``;
}

export async function discordNewTopic({
  topic,
  name,
  userId,
}: {
  topic: Topic;
  name: string;
  userId: string;
}) {
  await callDiscord(getTemplateNewTopic({ topic, name, userId }));
}
