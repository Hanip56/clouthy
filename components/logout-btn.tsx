"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const LogoutBtn = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full hover:bg-gray-50"
      onClick={() => signOut()}
    >
      <LogOut className="w-5 h-5" />
    </Button>
  );
};

export default LogoutBtn;
