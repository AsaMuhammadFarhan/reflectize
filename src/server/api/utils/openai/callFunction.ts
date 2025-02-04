import OpenAI from "openai";

export default async function callChatGPT({ chat }: { chat: string }) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: chat,
        },
      ],
      model: "gpt-4o-mini",
    });

    const response = chatCompletion.choices?.[0]?.message.content;
    return response;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      if (error.status === 402 && error.error?.code === "insufficient_quota") {
        console.error("OpenAI API quota exceeded:", error);
        throw new Error(
          "OpenAI API quota exceeded. Please check your billing."
        );
      } else if (
        error.status === 401 &&
        error.error?.code === "invalid_api_key"
      ) {
        console.error("Invalid OpenAI API Key:", error);
        throw new Error("Invalid OpenAI API key provided.");
      } else {
        console.error("Unexpected Error calling OpenAI:", error);
        throw new Error("Failed to generate feedback from OpenAI.");
      }
    }
  }
}
