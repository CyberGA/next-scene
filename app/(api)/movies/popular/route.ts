import { TMDB_Endpoints, TMDB_Request } from "@/services/request.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");

  try {
    const response = await TMDB_Request.get(
      `${TMDB_Endpoints.fetchPopular}&page=${page}`
    );
    const data = response.data.results;
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Could not fetch popular movies", {
      status: 500,
    });
  }
}
