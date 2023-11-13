"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import qs from "query-string";

const SearchFilter = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClick = () => {
    const url = qs.stringifyUrl({
      url: window.location.href,
      query: {
        search: inputRef.current?.value,
      },
    });

    router.push(url);
  };

  return (
    <div className="flex items-center rounded-full border gap-2 p-4 px-6 shadow-custom">
      <input
        className="outline-none flex-1"
        type="text"
        placeholder="Search..."
        ref={inputRef}
      />
      <Button
        className="flex-shrink-0 hover:bg-slate-50 rounded-full"
        size="icon"
        variant={"ghost"}
        onClick={handleClick}
      >
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SearchFilter;
