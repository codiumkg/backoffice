import Typography from "../Typography/Typography";

import styles from "./Header.module.scss";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
// import { useUserData } from "@/queries/userdata";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

export default function Header() {
  const navigate = useNavigate();

  const { removeTokenFromStorage } = useAuth();

  // const { data: userData, isFetching } = useUserData();

  const handleLogout = () => {
    removeTokenFromStorage();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className="flex center">
          {/* <div className={styles.user}>
            <Typography variant="body2" weight="600">
              {!isFetching ? userData?.username : "Пользователь"}
            </Typography>
          </div> */}
          <div className={styles.logo}>
            <Typography variant="h2" color="var(--text-color)">
              Codium Office
            </Typography>
          </div>
        </div>

        <Button onClick={handleLogout}>Выйти</Button>
      </div>
    </div>
  );
}
