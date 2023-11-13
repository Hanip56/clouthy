import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

type Props = {
  routes: { path: string; label: string }[];
};

const MobileMenuSheet = ({ routes }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="block sm:hidden">
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="text-2xl font-bold mb-8">Clouthy</SheetHeader>
        <ul className="flex flex-col text-lg gap-4">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <SheetClose className="font-medium tracking-wider">
                {route.label}
              </SheetClose>
            </Link>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuSheet;
