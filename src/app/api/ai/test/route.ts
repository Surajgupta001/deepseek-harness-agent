import { generateText } from "ai";
import { aiModel } from "@/ai/config";

export async function GET() {
  const { text } = await generateText({
    model: aiModel,
    prompt: "Say hello and introduce yourself as Deepseek Harness Agent.",
  });

  return Response.json({
    response: text,
  });
}
