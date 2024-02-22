import { Role } from "@/interfaces/auth";

export const DATE_FORMAT = "DD-MM-YYYY";

export const ROLES_DISPLAY = {
  ADMIN: "Админ",
  MANAGER: "Менеджер",
  TEACHER: "Преподаватель",
  STUDENT: "Студент",
};

export const ROLES_OPTIONS = Object.values(Role).map((role) => ({
  label: ROLES_DISPLAY[role],
  value: role,
}));

export enum TopicContentType {
  TASK,
  LECTURE,
}
