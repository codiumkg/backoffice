export const BASE_URL = import.meta.env.VITE_BASE_URL || "";
export const API_LOGIN = BASE_URL.concat("/auth/login/");
export const API_USERDATA = BASE_URL.concat("/auth/userdata/");
export const API_CHANGE_PASSWORD = BASE_URL.concat("/auth/change-password");
export const API_USERS = BASE_URL.concat("/users/");

export const API_REG_REQUESTS = BASE_URL.concat("/reg-requests/");
export const API_GROUPS = BASE_URL.concat("/groups/");
export const API_SUBJECTS = BASE_URL.concat("/subjects/");
export const API_SECTIONS = BASE_URL.concat("/sections/");
export const API_TOPICS = BASE_URL.concat("/topics/");
export const API_LECTURES = BASE_URL.concat("/lectures/");
export const API_TASKS = BASE_URL.concat("/tasks/");
export const API_TOPIC_CONTENT = BASE_URL.concat("/topic-content");
export const API_GROUP_STUDENTS = (groupId: number) =>
  BASE_URL.concat(`/groups/${groupId}/get-students`);
export const API_STUDENT_PROGRESS = (userId: number) =>
  BASE_URL.concat(`/users/${userId}/get-progress`);
export const API_METHODOLOGIES = BASE_URL.concat("/methodologies");
export const API_PRESENTATIONS = BASE_URL.concat("/presentations");
