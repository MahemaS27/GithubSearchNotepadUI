"use client";
import { Loading } from "@/app/components/Loading";
import { useGetContributors } from "@/app/hooks/useGetContributors";
import { useRepoDetails } from "@/app/hooks/useRepoDetails";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Details() {
  const params = useParams();
  const { ownerID, repoID } = params;

  const repoData = useRepoDetails(ownerID as string, repoID as string);
  const contributorsData = useGetContributors(
    ownerID as string,
    repoID as string,
  );
  console.log(repoData);
  console.log(contributorsData);
  if (repoData.loading) {
    return <Loading />;
  } else if (repoData.data) {
    return (
      <div className="flex flex-col gap-1">
        <h1>{repoData.data.name}</h1>
        <p className=" text-gray-500 italic">{repoData.data.description}</p>
        <h3 className="text-lg">Contributors:</h3>
        <div className="grid grid-flow-col grid-rows-6 gap-4">
          {contributorsData.data?.map((contributor) => {
            return (
              <Link key={contributor.id} href={contributor.html_url}>
                <div className="border rounded-lg hover:bg-gray-800 transition-colors cursor-pointer p-5">
                  {contributor.login}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else if (!repoData) {
    return (
      <div>Repo Details not found! Please check the id and try again.</div>
    );
  }
}
