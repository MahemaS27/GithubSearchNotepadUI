"use client";

import { useState } from "react";
import { Repository, useGithubSearch } from "./hooks/useGithubSearch";
import { SearchResultCard } from "./components/SearchResultCard";
import { SearchBar } from "./components/SearchBar";

export default function Home() {
  const [query, setQuery] = useState<string>("Mahema");

  // call the API when the query changes debounced
  const searchData = useGithubSearch(query);

  return (
    <main>
      <h1>GitHub Search</h1>
      <SearchBar onSearch={setQuery} />
      <div className="flex flex-col gap-4">
        {/* use map when doing in template rendering!  */}
        {searchData.data.map((repo: Repository) => (
          <SearchResultCard key={repo.id} repository={repo} />
        ))}
      </div>
    </main>
  );
}
