"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

type Props = {
  data: { label: string; value: string }[];
  valueKey: string;
};

const SelectFilter = ({ data, valueKey }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = qs.parse(searchParams.toString());

  const handleChange = (selected: string) => {
    const query = {
      ...current,
      [valueKey]: selected,
    };

    if (selected === "default") {
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
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-48 rounded-full py-4 px-6">
        <SelectValue placeholder="Default Sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        {data.map((item) => (
          <SelectItem key={item.label} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
