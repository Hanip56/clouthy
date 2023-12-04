import Heading from "@/components/heading";
import menImg from "@/assets/images/category-men.jpg";
import men2Img from "@/assets/images/men-2.webp";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div>
      <Heading />
      <main className="flex flex-col gap-y-28 my-20 md:my-28">
        <section className="w-full flex flex-col justify-center text-center gap-y-10 ">
          <h2 className="text-4xl md:text-5xl font-medium">Our Story</h2>
          <div className="leading-7 md:leading-8 space-y-5 px-2">
            <p className="mx-auto max-w-3xl">
              Find thousands of original and quality local and international
              brands to complete your fashion needs. If your order doesn&apos;t
              satisfy you later, enjoy free 30 days easy returns throughout
              Indonesia.
            </p>
            <p className="mx-auto max-w-5xl text-gray-400">
              CLOUTHY is part of the Global Fashion Group, the world&apos;s
              leading fashion group. Founded in 2011 and dedicated to creating
              online fashion companies in developing countries. To date, Global
              Fashion Group operates in 27 countries. Global Fashion Group is
              present in India, the Middle East, South America and Russia.
              Through CLOUTHY, Global Fashion Group is able to access markets in
              Southeast Asia, while CLOUTHY is trying to become a fashion
              destination in Southeast Asia.
            </p>
          </div>
          <div className="w-[100%] h-80 mt-28 bg-slate-200 flex justify-center items-center">
            <p className="text-xl md:text-2xl max-w-4xl px-4 text-center leading-normal text-gray-400 font-mono">
              &quot;We spent years comparing travel hacks and notes on bags, but
              could never find a brand that checked all the boxes...so we
              created one ourselves.&quot;
            </p>
          </div>
        </section>
        <div>
          <section className="w-full flex flex-col lg:flex-row items-center overflow-hidden">
            <div className="w-full flex-1 flex-shrink-0">
              <Image
                src={men2Img}
                alt=""
                className="w-full h-full object-cover object-top aspect-square"
              />
            </div>
            <div className="basis-[50%] px-4 py-10 md:px-10">
              <h3 className="text-3xl md:text-4xl font-medium mb-6">
                The journey begins
              </h3>
              <p className="mx-auto leading-[1.7em]">
                CLOUTHY Indonesia was founded in 2012. Currently, CLOUTHY
                Indonesia is the fastest growing online fashion retailer in
                Asia. Sites in each country ensure that fashion products are
                tailored to the tastes of each country and adapt its
                preferences. With a choice of more than 500 local and
                international brands, we bring fashion into a better dimension
                than before. We offer women&apos;s clothing , men&apos;s
                clothing , shoes , accessories , sports equipment , Muslim
                fashion , and more! This is what makes us the main destination
                for online fashion in Indonesia. In just a few years, we have
                revolutionized the fashion scene in Asia, from your shopping
                habits to shaping your personal style. Over 30,000 products
                online and hundreds of new products every week, we are ambitious
                and will continue to grow. The good news is, we give you lots of
                options to stay stylish. We are a fashion provider that is
                balanced with the latest technology that will give you an
                unmatched online shopping experience. Why shop anywhere else
                when CLOUTHY is an online fashion store that caters to all your
                fashion needs. Contact us via Facebook, follow Twitter or
                Instagram for the latest information about fashion and the
                latest trends.
              </p>
            </div>
          </section>
          <section className="w-full flex flex-col lg:flex-row-reverse items-center overflow-hidden">
            <div className="flex-1 flex-shrink-0">
              <Image
                src={menImg}
                alt=""
                className="w-full h-full object-cover object-top aspect-square"
              />
            </div>
            <div className="basis-[50%] px-4 py-10 md:px-10">
              <h3 className="text-3xl md:text-4xl font-medium mb-6">
                Made to last
              </h3>
              <p className="mx-auto leading-[1.7em]">
                We believe in having fewer but better things. That’s why we
                decided from the outset that every single part we use matters,
                and every little detail counts. From Germany to Japan, we
                sourced the highest quality parts and materials in the world.
                And if we couldn’t find a component that met our standards, we
                worked with industry experts to make it ourselves.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
