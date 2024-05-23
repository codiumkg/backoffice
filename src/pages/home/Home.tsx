import { ROUTES } from "@/constants/routes";
import useAuth from "@/hooks/useAuth";
import useIsTeacher from "@/hooks/useIsTeacher";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const { checkIsLoggedIn } = useAuth();

  const isTeacher = useIsTeacher();

  useEffect(() => {
    if (checkIsLoggedIn()) {
      if (isTeacher) {
        navigate(ROUTES.MY_GROUPS, { replace: true });
      } else {
        navigate(ROUTES.REG_REQUESTS, { replace: true });
      }
    } else {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [checkIsLoggedIn, navigate, isTeacher]);
  return <></>;
}

export default Home;
