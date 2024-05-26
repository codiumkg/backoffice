import { Role } from "../interfaces/auth";
import { IResource } from "@/interfaces/resource";

export const RESOURCES: IResource[] = [
  {
    id: "users",
    title: "Пользователи",
    href: "/users",
    roles: [Role.ADMIN],
    detailsHref: "/user",
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
    detailsHref: "/subject",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: "sections",
    title: "Разделы",
    href: "/sections",
    detailsHref: "/section",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: "topics",
    title: "Топики",
    href: "/topics",
    detailsHref: "/topic",
    roles: [Role.ADMIN, Role.MANAGER, Role.TEACHER],
  },
  {
    id: "lectures",
    title: "Лекции",
    href: "/lectures",
    detailsHref: "/lecture",
    roles: [Role.ADMIN, Role.MANAGER, Role.TEACHER],
  },
  {
    id: "tasks",
    title: "Задачи",
    href: "/tasks",
    detailsHref: "/task",
    roles: [Role.ADMIN, Role.MANAGER, Role.TEACHER],
  },
  {
    id: "methodologies",
    title: "Методики",
    href: "/methodologies",
    detailsHref: "/methodology",
    roles: [Role.ADMIN, Role.MANAGER, Role.TEACHER],
  },
  {
    id: "presentations",
    title: "Презентации",
    href: "/presentations",
    detailsHref: "/presentation",
    roles: [Role.ADMIN, Role.MANAGER, Role.TEACHER],
  },
  {
    id: "my-groups",
    title: "Мои группы",
    href: "/my-groups",
    roles: [Role.ADMIN, Role.TEACHER],
  },
];
