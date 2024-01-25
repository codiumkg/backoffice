import { ROUTES } from "@/constants/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.OFFICE, { replace: true });
  }, []);
  return <></>;
}

export default Home;
