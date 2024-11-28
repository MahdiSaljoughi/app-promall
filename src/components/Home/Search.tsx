"use client";

import { SearchBar } from "../ui/search-bar/search-bar";

export default function Search() {
  const placeholders = ["هودی جردن", "کفش زوم اسپیس نایک"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <SearchBar
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </>
  );
}
