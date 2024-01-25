import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import GroupDetails from "@/pages/groups/GroupDetails";
import GroupsPage from "@/pages/groups/GroupsPage";
import Home from "@/pages/home/Home";
import LecturesPage from "@/pages/lectures/LecturesPage";
import Login from "@/pages/login/Login";
import RegRequestsPage from "@/pages/req-requests/RegRequestsPage";
import SectionsPage from "@/pages/sections/SectionsPage";
import SubjectsPage from "@/pages/subjects/SubjectsPage";
import TopicsPage from "@/pages/topics/TopicsPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="office" element={<DashboardLayout />}>
        <Route path="group" element={<GroupDetails />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="sections" element={<SectionsPage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="lectures" element={<LecturesPage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="reg-requests" element={<RegRequestsPage />} />
      </Route>
    </Route>
  )
);

function RootRouter() {
  return <RouterProvider router={router} />;
}

export default RootRouter;
