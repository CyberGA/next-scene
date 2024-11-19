import MovieDetails from "@/containers/MovieDetails";

interface MovieDetailsPageProps {
  id: string;
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactNode> {
  const id = (await params).id;
  console.log(id);
  return (
    <MovieDetails id={id} />
  );
}
