import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import GroupDetails from "@/pages/groups/GroupDetails";
import GroupsPage from "@/pages/groups/GroupsPage";
import Home from "@/pages/home/Home";
import LectureDetails from "@/pages/lectures/LectureDetails";
import LecturesPage from "@/pages/lectures/LecturesPage";
import Login from "@/pages/login/Login";
import RegRequestsPage from "@/pages/req-requests/RegRequestsPage";
import SectionDetails from "@/pages/sections/SectionDetails";
import SectionsPage from "@/pages/sections/SectionsPage";
import SubjectDetails from "@/pages/subjects/SubjectDetails";
import SubjectsPage from "@/pages/subjects/SubjectsPage";
import TaskDetails from "@/pages/tasks/TaskDetails";
import TasksPage from "@/pages/tasks/TasksPage";
import TopicDetails from "@/pages/topics/TopicDetails";
import TopicsPage from "@/pages/topics/TopicsPage";
import UserDetails from "@/pages/users/UserDetails";
import UsersPage from "@/pages/users/UsersPage";

function RootRouter({ children }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="office" element={<DashboardLayout />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="user" element={<UserDetails />} />
            <Route path="user/:id" element={<UserDetails />} />
            <Route path="group" element={<GroupDetails />} />
            <Route path="group/:id" element={<GroupDetails />} />
            <Route path="groups" element={<GroupsPage />} />
            <Route path="sections" element={<SectionsPage />} />
            <Route path="section" element={<SectionDetails />} />
            <Route path="section/:id" element={<SectionDetails />} />
            <Route path="topics" element={<TopicsPage />} />
            <Route path="topic" element={<TopicDetails />} />
            <Route path="topic/:id" element={<TopicDetails />} />
            <Route path="lectures" element={<LecturesPage />} />
            <Route path="lecture" element={<LectureDetails />} />
            <Route path="lecture/:id" element={<LectureDetails />} />
            <Route path="subjects" element={<SubjectsPage />} />
            <Route path="subject" element={<SubjectDetails />} />
            <Route path="subject/:id" element={<SubjectDetails />} />
            <Route path="reg-requests" element={<RegRequestsPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="task" element={<TaskDetails />} />
            <Route path="task/:id" element={<TaskDetails />} />
          </Route>
        </Route>
      </Routes>

      {children}
    </BrowserRouter>
  );
}

export default RootRouter;
