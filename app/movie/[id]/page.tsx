import MovieDetails from "@/containers/MovieDetails";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactNode> {
  const id = (await params).id;
  return (
    <MovieDetails id={id} />
  );
}
