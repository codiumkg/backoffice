import { RESOURCES } from "@/constants/resource";
import NavElement from "../NavElement/NavElement";
import Typography from "../Typography/Typography";
import styles from "./Sidebar.module.scss";
import { useUserData } from "@/queries/userdata";
import { Role } from "@/interfaces/auth";

export default function Sidebar() {
  const { data: userData } = useUserData();

  const role = userData?.role;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography weight="600">Администрация</Typography>
        </div>

        <div className={styles.content}>
          {RESOURCES.map(
            (resource) =>
              (role === Role.ADMIN || resource.roles?.includes(role!)) && (
                <NavElement
                  key={resource.id}
                  title={resource.title}
                  href={resource.href}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
