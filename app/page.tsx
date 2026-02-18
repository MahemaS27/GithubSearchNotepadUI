"use client";

import { useState } from "react";
import { Repository, useGithubSearch } from "./hooks/useGithubSearch";
import { SearchResultCard } from "./components/SearchResultCard";
import { SearchBar } from "./components/SearchBar";
import { usePracticePostRequest } from "./hooks/usePracticePostRequest";
import { Loading } from "./components/Loading";

export default function Home() {
  const [query, setQuery] = useState<string>("Mahema");

  // call the API when the query changes debounced
  const searchData = useGithubSearch(query);
  const postData = usePracticePostRequest(
    "Mahema's Post Practice",
    "I need to practice this for my interview",
    3,
  );

  console.log(postData);
  console.log(searchData.loading);

  return (
    <main>
      <div className="flex flex-col gap-4">
        <h1>GitHub Search</h1>
        <SearchBar onSearch={setQuery} />
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
