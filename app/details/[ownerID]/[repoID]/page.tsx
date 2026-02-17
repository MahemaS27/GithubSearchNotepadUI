"use client";
import { Loading } from "@/app/components/Loading";
import { useGetContributors } from "@/app/hooks/useGetContributors";
import { useRepoDetails } from "@/app/hooks/useRepoDetails";
import { useParams } from "next/navigation";

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
        <h2 className="text-xl text-gray-500 italic">
          {repoData.data.description}
        </h2>
        <div className="flex flex-col gap-1">Contributiors::</div>
      </div>
    );
  } else if (!repoData) {
    return (
      <div>Repo Details not found! Please check the id and try again.</div>
    );
  }
}
