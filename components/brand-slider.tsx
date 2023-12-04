import brand1 from "@/assets/images/brand-1.png";
import brand2 from "@/assets/images/brand-2.png";
import brand3 from "@/assets/images/brand-3.png";
import brand4 from "@/assets/images/brand-4.png";
import brand5 from "@/assets/images/brand-5.png";
import Image from "next/image";

const brands = [brand1, brand2, brand3, brand4, brand5];

const BrandSlider = () => {
  return (
    <div className="relative h-40 w-full overflow-hidden flex">
      {/* gradient left */}
      <span className="absolute hidden sm:block sm:w-[10vw] md:w-52 h-full bg-gradient-to-r from-white z-10 to-transparent left-0 top-0" />

      <div className="inline-block">
        <div className="h-full w-fit flex animate-[slide_10s_linear_infinite]">
          {brands.map((brand, i) => (
            <div
              key={`Brand-${i + 1}`}
              className="w-60 p-6 px-8 h-full flex-shrink-0"
            >
              <Image
                src={brand}
                alt={`Brand-${i + 1}`}
                width={300}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="inline-block">
        <div className="h-full w-fit flex animate-[slide_10s_linear_infinite]">
          {brands.map((brand, i) => (
            <div
              key={`Brand-${i + 1}`}
              className="w-60 p-6 px-8 h-full flex-shrink-0"
            >
              <Image
                src={brand}
                alt={`Brand-${i + 1}`}
                width={300}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* gradient right */}
      <span className="absolute hidden sm:block sm:w-[10vw] md:w-52 h-full bg-gradient-to-l from-white z-10 to-transparent right-0 top-0" />
    </div>
  );
};

export default BrandSlider;
