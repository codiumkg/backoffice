import { ReactNode } from "react";

import { Icons } from "../Icons";
import Typography from "../Typography/Typography";
import { Button } from "@nextui-org/react";

import useIsTeacher from "@/hooks/useIsTeacher";
import SearchBar from "../SearchBar";
import FiltersBar from "../FiltersBar";
import { Role } from "@/interfaces/auth";
import { ROLES_DISPLAY } from "@/constants/common";
interface Props {
  title: string;
  onCreateClick?: () => void;
  children?: ReactNode;
  itemsLength?: number;
  withSearch?: boolean;
  withFiltersBar?: boolean;
}

export default function ResourceList({
  title,
  children,
  withSearch = false,
  withFiltersBar = false,
  onCreateClick,
}: Props) {
  const isTeacher = useIsTeacher();

  return (
    <div className="flex gap-4">
      <div className="w-full min-h-sreen flex flex-col gap-4 flex-[1_1_70%]">
        <div className="w-full h-[56px] p-4 flex justify-between items-center rounded-xl bg-bgSecondary">
          <div className="flex center">
            <Icons.LIST_BOX className="text-3xl mr-2" />
            <Typography>{title}</Typography>
          </div>

          <div className="flex gap-4">
            {withSearch && <SearchBar />}

            {!isTeacher && onCreateClick && (
              <div>
                <Button
                  onClick={onCreateClick}
                  color="primary"
                  startContent={<Icons.PLUS className="text-lg" />}
                >
                  Добавить
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full">{children}</div>
      </div>

      {withFiltersBar && (
        <div className="flex-[1_1_0%]">
          <FiltersBar
            filters={[
              {
                label: "Роль",
                key: "role",
                values: Object.values(Role).map((role) => ({
                  label: ROLES_DISPLAY[role],
                  value: role,
                })),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
