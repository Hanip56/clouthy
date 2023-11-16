import Heading from "@/components/heading";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <Heading />
      <main className="flex flex-col gap-y-28 my-20 md:my-28">
        <section className="w-full flex flex-col justify-center text-center gap-y-10 ">
          <h2 className="text-4xl md:text-5xl font-medium">Our Story</h2>
          <div className="leading-7 md:leading-8 space-y-5 px-2">
            <p className="mx-auto max-w-3xl">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in injected humour, or
              randomise Contrary to popular belief Lorem Ipsum
            </p>
            <p className="mx-auto max-w-5xl text-gray-400">
              Alteration in some form injected humour words which don&apos;t
              even slightly believable. If you are going use passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing
              hidden Alterationsome form injected humour words which don&apos;t
              even slightly believable. If you going use passage humour words
              which don&apos;t even slightly believable.
            </p>
          </div>
          <div className="w-[100%] h-80 mt-28 bg-slate-200"></div>
        </section>
        <section className="w-full space-y-10 text-center">
          <h2 className="text-4xl md:text-5xl font-medium">Our Team</h2>
          <div className="leading-7 md:leading-8 space-y-5 px-2 sm:px-4">
            <p className="mx-auto max-w-3xl">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in injected humour, or
              randomise Contrary to popular belief Lorem Ipsum
            </p>
          </div>
          <div className="w-[90%]  sm:max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-wrap">
            {Array(4)
              .fill("")
              .map((_, i) => (
                <div className="space-y-4 md:space-y-6" key={i}>
                  <div className="bg-slate-200 w-full h-72" />
                  <div className="md:space-y-2">
                    <p className="text-lg md:text-xl font-medium tracking-wide">
                      User {i}
                    </p>
                    <p className="tracking-wide md:text-lg">Profession</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
