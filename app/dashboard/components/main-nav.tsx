"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PercentDiamond,
  PencilRuler,
  PaintBucket,
  ShirtIcon,
  Truck,
  Boxes,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: <LayoutDashboard />,
      active: pathname === "/dashboard",
    },
    {
      label: "Categories",
      path: "/dashboard/categories",
      icon: <PercentDiamond />,
      active: pathname === "/dashboard/categories",
    },
    {
      label: "Sizes",
      path: "/dashboard/sizes",
      icon: <PencilRuler />,
      active: pathname === "/dashboard/sizes",
    },
    {
      label: "Color",
      path: "/dashboard/colors",
      icon: <PaintBucket />,
      active: pathname === "/dashboard/colors",
    },
    {
      label: "Product",
      path: "/dashboard/products",
      icon: <ShirtIcon />,
      active: pathname === "/dashboard/products",
    },
    {
      label: "Product Entry",
      path: "/dashboard/product_entrys",
      icon: <Boxes />,
      active: pathname === "/dashboard/product_entrys",
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <Truck />,
      active: pathname === "/dashboard/orders",
    },
  ];

  return (
    <nav className="my-6 px-3">
      <div className="font-semibold text-sm pl-4 text-gray-400 tracking-wide mb-3">
        E-commerce
      </div>
      {routes.map((route) => (
        <Link href={route.path} key={route.path}>
          <div
            className={cn(
              "py-3 px-4 flex gap-2 items-center font-semibold transition",
              route.active
                ? "ring-1 ring-slate-300 shadow-sm rounded-md"
                : "text-gray-400 hover:text-black dark:hover:text-white"
            )}
          >
            {route.icon}
            <span className="text-sm">{route.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
