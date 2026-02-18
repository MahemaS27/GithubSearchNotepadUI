"use client";
import { Loading } from "@/app/components/Loading";
import { useGetContributors } from "@/app/hooks/useGetContributors";
import { useRepoDetails } from "@/app/hooks/useRepoDetails";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Table } from "@radix-ui/themes";
import { ToggleButton } from "@/app/components/ToggleButton";

export default function Details() {
  const params = useParams();
  const { ownerID, repoID } = params;
  const [viewMode, setViewMode] = useState<boolean>(false);

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
        <Link
          href={repoData.data.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex gap-1">
            <h1 className="">{repoData.data.name}</h1>
            <h1>{"->"}</h1>
          </div>
        </Link>
        <p className=" text-gray-500 italic">{repoData.data.description}</p>
        <div className="flex justify-between">
          <h3 className="text-3xl">Contributors:</h3>
          <ToggleButton
            pressed={!viewMode}
            onPressedChange={() => setViewMode(!viewMode)}
          />
        </div>
        {viewMode ? (
          <div
            className="grid grid-flow-col grid-rows-6 gap-4"
            aria-label="grid view of contributors"
          >
            {contributorsData.data?.map((contributor) => (
              <Link key={contributor.id} href={contributor.html_url}>
                <div className="border rounded-lg hover:bg-gray-800 transition-colors cursor-pointer p-5">
                  {contributor.login}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Table.Root aria-label="contributors table">
            <Table.Header>
              <Table.Row className="text-white">
                <Table.ColumnHeaderCell className="text-white">
                  Username
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-white">
                  Contributions
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-white">
                  Placeholder
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {contributorsData.data?.map((contributor) => (
                <Table.Row className="text-white" key={contributor.id}>
                  <Table.RowHeaderCell className="text-white">
                    {contributor.login}
                  </Table.RowHeaderCell>
                  <Table.Cell className="text-white">
                    {contributor.contributions}
                  </Table.Cell>
                  <Table.Cell className="text-white">Placeholder</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </div>
    );
  } else if (!repoData) {
    return (
      <div>Repo Details not found! Please check the id and try again.</div>
    );
  }
}
