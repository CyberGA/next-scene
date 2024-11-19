import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center mt-10 px-6">
      <h1 className="text-red-base text-5xl font-semibold my-20">Opps!!</h1>
      <p className="text-4xl max-w-80 w-full mx-auto text-center mb-3">Looks like this page does not exist</p>
      <Link
        href="/"
        className="px-5 py-4 rounded-lg bg-red-base text-white font-semibold"
      >
        See popular movies
      </Link>
    </div>
  );
}
