import { IFilter } from "@/interfaces/common";
import { Card, CardBody, Tooltip } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import { Icons } from "./Icons";

interface Props {
  filters: IFilter[];
}

export default function FiltersBar({ filters }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);

    setSearchParams(searchParams);
  };

  const handleFiltersReset = () => {
    filters.forEach((filter) => {
      searchParams.delete(filter.key);
    });
    setSearchParams(searchParams);
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col p-1 text-sm gap-4">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Фильтры</h1>

            <Tooltip content="Сбросить фильтры" showArrow placement="top-end">
              <span
                className="text-lg cursor-pointer"
                onClick={handleFiltersReset}
              >
                <Icons.DELETE />
              </span>
            </Tooltip>
          </div>

          <div className="flex flex-col gap-3">
            {filters.map((filter) => (
              <div key={filter.key} className="flex flex-col gap-2">
                <h1 className="font-light">{filter.label}</h1>
                <div className="flex flex-col gap-2">
                  {filter.values.map((value) => (
                    <div
                      key={value.value}
                      className={cn(
                        "p-1 cursor-pointer font-light text-xs hover:text-primary duration-300",
                        value.value === searchParams.get(filter.key)
                          ? "text-primary"
                          : ""
                      )}
                      onClick={() =>
                        handleFilterClick(filter.key, value.value!)
                      }
                    >
                      {value.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
