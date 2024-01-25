import { Role } from "../interfaces/auth";
import { IResource } from "@/interfaces/resource";

export const RESOURCES: IResource[] = [
  {
    id: "requests",
    title: "Заявки",
    href: "/reg-requests",
    roles: [Role.MANAGER],
  },
  {
    id: "groups",
    title: "Группы",
    href: "/groups",
    roles: [Role.MANAGER],
  },
  {
    id: "subjects",
    title: "Предметы",
    href: "/subjects",
    roles: [Role.MANAGER],
  },
  {
    id: "sections",
    title: "Разделы",
    href: "/sections",
    roles: [Role.MANAGER],
  },
  {
    id: "topics",
    title: "Топики",
    href: "/topics",
    roles: [Role.MANAGER],
  },
  {
    id: "lectures",
    title: "Лекции",
    href: "/lectures",
    roles: [Role.MANAGER],
  },
  // {
  //   id: "tasks",
  //   title: "Задания",
  //   href: "/tasks",
  //   roles: [Role.MANAGER],
  // },
  // {
  //   id: "task-results",
  //   title: "Результаты заданий",
  //   href: "/task-results",
  //   roles: [Role.MANAGER, Role.TEACHER],
  // },
];
