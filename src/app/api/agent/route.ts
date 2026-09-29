import { z } from "zod";
import { runAgent } from "@/agent/agent";

const agentRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = agentRequestSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid request",
          details: result.error.issues,
        },
        { status: 400 },
      );
    }

    const response = await runAgent(result.data.prompt);

    return Response.json({
      response,
    });
  } catch (error) {
    console.error("Agent error:", error);

    return Response.json(
      {
        error: "Failed to run agent",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
