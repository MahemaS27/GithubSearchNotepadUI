// Correct for App Router
import { useRouter } from "next/navigation";
import { convertToReadableString } from "../helpers/helpers";
import { Repository } from "../hooks/useGithubSearch";

interface SearchResultCardProps {
  repository: Repository;
}

export function SearchResultCard({ repository }: SearchResultCardProps) {
  const formattedUpdateString = convertToReadableString(repository.updated_at);
  const router = useRouter();

  const handleNavigationToDetails = (repoID: string, ownerID: string) => {
    router.push(`/details/${ownerID}/${repoID}`);
  };
  return (
    <div
      className="border p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
      onClick={() =>
        handleNavigationToDetails(repository.name, repository.owner.login)
      }
    >
      <div>{repository.name}</div>
      <div>{repository.description}</div>
      <div>{repository.language}</div>
      <div>{repository.owner.login}</div>
      <div>Last Updated {formattedUpdateString}</div>
    </div>
  );
}
