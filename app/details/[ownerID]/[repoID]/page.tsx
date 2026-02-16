"use client";
import { useRepoDetails } from "@/app/hooks/useRepoDetails";
import { useParams } from "next/navigation";

export default function Details() {
  const params = useParams();
  const { ownerID, repoID } = params;

  const repoData = useRepoDetails(ownerID as string, repoID as string);
  console.log(repoData);

  if (repoData.data) {
    return <div>{repoData.data.name}</div>;
  } else {
    return (
      <div>Repo Details not found! Please check the id and try again.</div>
    );
  }
}
