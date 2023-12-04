import {
  CloudFog,
  Facebook,
  Instagram,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-slate-100 mt-auto py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-16">
        <div className="space-y-4">
          <div className="flex items-center">
            <CloudFog className="w-6 h-6 mr-2" />
            <span className="text-2xl font-bold">Clouthy</span>
          </div>
          <p className="text-gray-500">&copy; 2023 developed by Halfz.</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-500">
            No. 12870 – Jl Persada Kav 1, Dki Jakarta, 819 Dki Jakarta.
            business@web.com +00 123 456 789
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">GET 32% OFF</h3>
          <p className="text-gray-500">By subscribe to our newsletter</p>
          <div className="text-gray-500 rounded-full border border-slate-300 flex items-center bg-white px-4 py-2">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="flex-1 outline-none w-full"
            />
            <Send className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">FOLLOW US ON</h3>
          <div className="flex items-center gap-6 mt-4 text-gray-500">
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
