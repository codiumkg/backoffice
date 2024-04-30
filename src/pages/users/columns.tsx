import { IUser } from "@/interfaces/user";
import { ROLES_DISPLAY } from "@/constants/common";

export const columns = [
  { key: "id", label: "ID" },
  { key: "username", label: "Логин" },
  { key: "firstName", label: "Имя" },
  { key: "lastName", label: "Фамилия" },
  { key: "role", label: "Роль" },
];

export const renderCell = (user: IUser, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof IUser];

  switch (columnKey) {
    case "role":
      return ROLES_DISPLAY[user.role];
    case "firstName":
      return user.profile?.firstName;
    case "lastName":
      return user.profile?.lastName;
    default:
      return cellValue as string;
  }
};
