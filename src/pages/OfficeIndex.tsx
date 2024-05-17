import { ROUTES } from "@/constants/routes";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OfficeIndex() {
  const navigate = useNavigate();

  const { checkIsLoggedIn } = useAuth();

  useEffect(() => {
    if (checkIsLoggedIn()) {
      navigate(ROUTES.REG_REQUESTS);
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, [checkIsLoggedIn, navigate]);

  return null;
}
