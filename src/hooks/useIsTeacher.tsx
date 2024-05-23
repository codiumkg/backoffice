import { StorageKeys } from "@/constants/storageKeys";
import { Role } from "@/interfaces/auth";
import { useUserData } from "@/queries/userdata";
import { useMemo } from "react";

export default function useIsTeacher() {
  const { data: userdata } = useUserData();

  const isTeacher = useMemo(
    () =>
      localStorage.getItem(StorageKeys.ROLE) === Role.TEACHER ||
      userdata?.role === Role.TEACHER,
    [userdata]
  );

  return isTeacher;
}
