import { ROUTES } from "@/constants/routes";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const { checkIsLoggedIn } = useAuth();

  useEffect(() => {
    if (checkIsLoggedIn()) {
      navigate(ROUTES.REG_REQUESTS, { replace: true });
    } else {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [checkIsLoggedIn, navigate]);
  return <></>;
}

export default Home;
