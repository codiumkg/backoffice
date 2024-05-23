import { Role } from "@/interfaces/auth";
import { useUserData } from "@/queries/userdata";
import { useMemo } from "react";

export default function useIsTeacher() {
  const { data: userdata } = useUserData();

  const isTeacher = useMemo(() => userdata?.role === Role.TEACHER, [userdata]);

  return isTeacher;
}
