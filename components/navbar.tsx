import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { CloudFog, User } from "lucide-react";
import { getServerSession } from "next-auth";
import { options } from "@/lib/nextAuthOptions";
import LogoutBtn from "./logout-btn";
import CartSheet from "./cart-sheet";
import MobileMenuSheet from "./mobile-menu-sheet";

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
    {
      path: "/contact",
      label: "Contact",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <nav className="max-w-7xl mx-auto h-28 flex items-center justify-between px-4">
        {/* logo */}
        <div className="flex items-center">
          <CloudFog className="w-6 h-6 mr-2" />
          <span className="text-2xl font-bold">Clouthy</span>
        </div>

        {/* list */}
        <ul className="hidden sm:flex gap-6">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <li className="font-medium tracking-wider">{route.label}</li>
            </Link>
          ))}
        </ul>
        {/* action */}
        <div className="flex gap-2">
          <CartSheet />
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
          <MobileMenuSheet routes={routes} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
