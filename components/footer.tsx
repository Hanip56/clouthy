import { Facebook, Instagram, PlaneIcon, Twitter, Youtube } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-slate-100 mt-auto py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-16">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Clouthy</h1>
          <p className="text-gray-500">
            &copy; 2023 design and developed by Halfz.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-500">
            No. 651 – London Oxford Street, 819 United Kingdom.
            business@webflow.com +00 123 456 789
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">GET 32% OFF</h3>
          <p className="text-gray-500">By subscribe to our newsletter</p>
          <div className="rounded-full border">
            <input type="text" placeholder="Enter Your Email" />
            <PlaneIcon className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold">FOLLOW US ON</h3>
          <div className="flex items-center gap-2 mt-4">
            <a href="#">
              <Facebook />
            </a>
            <a href="#">
              <Instagram />
            </a>
            <a href="#">
              <Twitter />
            </a>
            <a href="#">
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
