"use client";

import { Button } from "@/components/ui/button";
import { Category, Color, Size } from "@prisma/client";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

type FilterProps = {
  title: string;
  data: (Size | Color | Category)[];
  valueKey: string;
};

const Filter = ({ title, data, valueKey }: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValue = searchParams.get(valueKey);

  const handleClick = (itemId: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: itemId,
    };

    if (current[valueKey] === itemId) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.replace(url);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="flex gap-2 flex-wrap text-sm">
        {data.map((item) => (
          <Button
            key={item.id}
            variant={selectedValue === item.id ? "default" : "outline"}
            onClick={() => handleClick(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
