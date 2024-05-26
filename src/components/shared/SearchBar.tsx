import { useSearchParams } from "react-router-dom";
import CustomInput from "./CustomInput/CustomInput";
import { Icons } from "./Icons";
import { debounce } from "lodash";
import { ChangeEvent } from "react";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (!text.length) {
      searchParams.delete("search");
    } else {
      searchParams.append("search", text);
    }
    setSearchParams(searchParams);
  }, 500);

  return (
    <CustomInput
      startContent={<Icons.SEARCH />}
      placeholder="Поиск..."
      onChange={onSearchChange}
    />
  );
}
