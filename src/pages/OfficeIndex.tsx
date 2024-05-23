import { ROUTES } from "@/constants/routes";
import useAuth from "@/hooks/useAuth";
import useIsTeacher from "@/hooks/useIsTeacher";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OfficeIndex() {
  const navigate = useNavigate();

  const isTeacher = useIsTeacher();

  const { checkIsLoggedIn } = useAuth();

  useEffect(() => {
    if (checkIsLoggedIn()) {
      if (isTeacher) {
        navigate(ROUTES.MY_GROUPS);
      } else {
        navigate(ROUTES.REG_REQUESTS);
      }
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, [checkIsLoggedIn, navigate, isTeacher]);

  return <></>;
}
