import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { Icons } from "../Icons";
import Typography from "../Typography/Typography";
import { useUserData } from "@/queries/userdata";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ROLES_DISPLAY } from "@/constants/common";

export default function Header() {
  const navigate = useNavigate();

  const { data: userData, isLoading } = useUserData();

  const { logout } = useAuth();

  const username = userData?.username;
  const role = userData ? ROLES_DISPLAY[userData?.role] : "";

  return (
    <div className="w-full h-16">
      <div className="w-full h-full flex justify-between items-center bg-bgSecondary p-8">
        <div>
          <Typography variant="h2" color="var(--text-color)">
            Codium Office
          </Typography>
        </div>

        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <Dropdown>
            <DropdownTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <div className="grid place-content-center w-10 h-10 border border-foreground rounded-full">
                  <Icons.USER />
                </div>

                <div>
                  <h1 className="text-sm">{username}</h1>
                  <h3 className="text-xs">{role}</h3>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Выпадающий список действий пользователя"
              items={[
                { label: "Профиль", onClick: () => navigate(ROUTES.PROFILE) },
                { label: "Выйти", onClick: () => logout() },
              ]}
            >
              {(item) => (
                <DropdownItem
                  key={item.label}
                  className="m-0"
                  onClick={item.onClick}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
