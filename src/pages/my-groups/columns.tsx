import { IUser } from "@/interfaces/user";

export const columns = [
  { key: "id", label: "ID" },
  { key: "username", label: "Логин" },
  { key: "firstName", label: "Имя" },
  { key: "lastName", label: "Фамилия" },
];

export const renderCell = (user: IUser, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof IUser];

  switch (columnKey) {
    case "firstName":
      return user.profile?.firstName;
    case "lastName":
      return user.profile?.lastName;
    default:
      return cellValue as string;
  }
};
