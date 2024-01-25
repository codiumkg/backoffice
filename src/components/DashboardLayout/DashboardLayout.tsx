import Header from "../shared/Header/Header";
import Sidebar from "../shared/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

import styles from "./DashboardLayout.module.scss";

function DashboardLayout() {
  return (
    <div className="flex-col">
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
