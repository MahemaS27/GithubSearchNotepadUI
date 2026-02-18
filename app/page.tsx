"use client";

import { useMemo, useState } from "react";
import { Repository, useGithubSearch } from "./hooks/useGithubSearch";
import { SearchResultCard } from "./components/SearchResultCard";
import { SearchBar } from "./components/SearchBar";
import { usePracticePostRequest } from "./hooks/usePracticePostRequest";
import { Loading } from "./components/Loading";
import { usePracticePatchRequest } from "./hooks/usePracticePatchRequest";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") ?? "Mahema");
  // call the API when the query changes debounced
  const searchData = useGithubSearch(query);
  const updates = useMemo(() => ({ title: "Mahema's Put Practice" }), []);

  const postData = usePracticePostRequest(
    "Mahema's Post Practice",
    "I need to practice this for my interview",
    3,
  );
  const patchData = usePracticePatchRequest(3, updates);

  console.log(postData);
  console.log(patchData);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    router.push(`?q=${newQuery}`);
  };

  return (
    <main>
      <div className="flex flex-col gap-4">
        <h1>GitHub Search</h1>
        <SearchBar onSearch={handleSearch} />
        {searchData.loading ? (
          <Loading loadingMessage={"Loading search results please wait..."} />
        ) : (
          <div className="flex flex-col gap-4">
            {/* use map when doing in template rendering!  */}
            {searchData.data.map((repo: Repository) => (
              <SearchResultCard key={repo.id} repository={repo} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
