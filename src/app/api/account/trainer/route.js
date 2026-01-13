import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      console.log("No session or user ID found");
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        trainer: true,
      },
    });
    console.log("Fetched user:", user);
    if (!user || !user.trainer) {
      return Response.json({ trainer: null });
    }

    return Response.json({ trainer: user.trainer });
  } catch (error) {
    console.error("Error fetching trainer:", error);
    return Response.json({ error: "Failed to fetch trainer" }, { status: 500 });
  }
}
