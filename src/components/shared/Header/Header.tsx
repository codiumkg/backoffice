import Typography from "../Typography/Typography";

import styles from "./Header.module.scss";
import useAuth from "@/hooks/useAuth";
// import { useUserData } from "@/queries/userdata";
import { Button } from "@nextui-org/react";

export default function Header() {
  const { logout } = useAuth();

  // const { data: userData, isFetching } = useUserData();

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

        <Button onClick={() => logout()}>Выйти</Button>
      </div>
    </div>
  );
}
