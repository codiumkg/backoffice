import { ROUTES } from "@/constants/routes";
import useAuth from "@/hooks/useAuth";
import { Role } from "@/interfaces/auth";
import { useUserData } from "@/queries/userdata";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OfficeIndex() {
  const navigate = useNavigate();

  const { data: userdata } = useUserData();

  const { checkIsLoggedIn } = useAuth();

  useEffect(() => {
    if (checkIsLoggedIn()) {
      if (userdata?.role === Role.TEACHER) {
        navigate(ROUTES.MY_GROUPS);
      } else {
        navigate(ROUTES.REG_REQUESTS);
      }
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, [checkIsLoggedIn, navigate, userdata]);

  return null;
}
