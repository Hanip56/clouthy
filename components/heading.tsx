"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  customPath?: string;
};

const Heading = ({ customPath }: Props) => {
  const pathname = usePathname();

  const path = customPath || pathname;

  let splitted = path
    .split("/")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  const title = splitted[splitted.length - 1];

  return (
    <header className="bg-slate-100 h-60 flex flex-col items-center justify-center gap-4 text-center px-2 ">
      <h1 className="text-5xl font-semibold uppercase">{title}</h1>
      <div className="flex items-center gap-2 text-lg">
        {splitted.map((word, i) => {
          return splitted.length - 1 === i ? (
            <span>{word === "" ? "Home" : word}</span>
          ) : (
            <>
              <Link
                className="text-gray-500 hover:text-black transition"
                href={`/${word.toLowerCase()}`}
              >
                {word === "" ? "Home" : word}
              </Link>
              <span>•</span>
            </>
          );
        })}
      </div>
    </header>
  );
};

export default Heading;
