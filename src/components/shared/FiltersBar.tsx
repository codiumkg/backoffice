import { IFilter } from "@/interfaces/common";
import { Card, CardBody } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";

interface Props {
  filters: IFilter[];
}

export default function FiltersBar({ filters }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);

    setSearchParams(searchParams);
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col p-1 text-sm gap-4">
          <h1 className="font-bold">Фильтры</h1>

          <div className="flex flex-col gap-3">
            {filters.map((filter) => (
              <div key={filter.key} className="flex flex-col gap-2">
                <h1 className="font-light">{filter.label}</h1>
                <div className="flex flex-col gap-2">
                  {filter.values.map((value) => (
                    <div
                      className={cn(
                        "p-1 cursor-pointer font-light text-xs",
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
