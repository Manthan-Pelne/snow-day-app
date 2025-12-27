"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function SearchBox() {
  const placeholders = [
    "Enter zip..... 50112",
    "Wnter City .... Alabama",
    "Enter zip..... 442001",
    "Wnter City .... Wardha",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
