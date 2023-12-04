import Image from "next/image";
import Link from "next/link";
import heroImg from "@/public/images/bag.png";

const Hero = () => {
  return (
    <div className="sm:h-[39rem] w-full bg-slate-100 py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:flex-row sm:items-center h-full">
        <div className="flex-1 flex flex-col h-full justify-center gap-6">
          <p className="text-lg text-red-500">Special Offer Session.</p>
          <h1 className="text-6xl font-medium leading-[1.2em]">
            New Product <br /> Collection
          </h1>
          <Link
            href={"/shop"}
            className="self-start py-2 border-b border-black"
          >
            <span className="font-medium"> DISCOVER MORE</span>
          </Link>
        </div>
        <div className="basis-[40%] flex-shrink-0">
          <Image
            src={heroImg}
            alt=""
            width={1000}
            height={1000}
            className=" aspect-square"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
