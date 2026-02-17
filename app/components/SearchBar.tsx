import { useState, useEffect } from "react";
// a debounced search bar that will take the input from the home page to use and search for the query
interface SearchBarProps {
  onSearch: (query: string) => void;
}
export function SearchBar({ onSearch }: SearchBarProps) {
  const debouncemS = 500;
  const [value, setValue] = useState<string>("");

  // debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debouncemS);
    return () => clearTimeout(timer);
  }, [onSearch, value]);

  return (
    <input
      type="text"
      aria-label="input-for-repo-search"
      className="border-2 border-solid p-1 rounded-sm lex flex-col gap-1 w-full"
      placeholder="Search for a Repository.."
      onChange={(e) => setValue(e.target.value)}
    ></input>
  );
}
