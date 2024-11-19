import { TMDB_Endpoints, TMDB_Request } from "@/services/request.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("movie_id");

  if (!id) {
    return new Response("Movie id is required", {
      status: 400,
    });
  }

  try {
    const response = await TMDB_Request.get(
      `${TMDB_Endpoints.fetchMovie}/${id}?language=en-US`
    );
    const data = response.data;
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Could not fetch details for movie with id - ${id}`, {
      status: 500,
    });
  }
}
