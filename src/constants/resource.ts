import { Role } from "../interfaces/auth";
import { IResource } from "@/interfaces/resource";
import { ROUTES } from "./routes";

export const RESOURCES: IResource[] = [
  {
    id: "users",
    title: "Пользователи",
    href: "/users",
    roles: [Role.ADMIN],
  },
  {
    id: "requests",
    title: "Заявки",
    href: "/reg-requests",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: "groups",
    title: "Группы",
    href: "/groups",
    roles: [Role.ADMIN, Role.MANAGER],
    detailsHref: "/group",
  },
  {
    id: "subjects",
    title: "Предметы",
    href: "/subjects",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: "sections",
    title: "Разделы",
    href: "/sections",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: "topics",
    title: "Топики",
    href: "/topics",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: "lectures",
    title: "Лекции",
    href: "/lectures",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: "tasks",
    title: "Задачи",
    href: "/tasks",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: "methodologies",
    title: "Методики",
    href: "/methodologies",
    roles: [Role.ADMIN, Role.MANAGER, Role.TEACHER],
  },
  {
    id: "presentations",
    title: "Презентации",
    href: "/presentations",
    roles: [Role.ADMIN, Role.MANAGER, Role.TEACHER],
  },
  {
    id: "my-groups",
    title: "Мои группы",
    href: "/my-groups",
    roles: [Role.ADMIN, Role.TEACHER],
  },
];
