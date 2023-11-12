import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingBag, User } from "lucide-react";
import { getServerSession } from "next-auth";
import { options } from "@/lib/nextAuthOptions";
import LogoutBtn from "./logout-btn";

const Navbar = async () => {
  const session = await getServerSession(options);

  const routes = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/about",
      label: "About",
    },
    {
      path: "/shop",
      label: "Shop",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <nav className="max-w-7xl mx-auto h-28 flex items-center justify-between">
        {/* logo */}
        <h1 className="text-2xl font-bold">Clouthy</h1>
        {/* list */}
        <ul className="flex gap-6">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <li className="font-medium tracking-wider">{route.label}</li>
            </Link>
          ))}
        </ul>
        {/* action */}
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-gray-50"
          >
            <ShoppingBag className="w-5 h-5" />
          </Button>
          {!session && (
            <Link href="/login">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-gray-50"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>
          )}
          {session && <LogoutBtn />}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
