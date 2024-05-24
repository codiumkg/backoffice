import { RESOURCES, TEACHER_MENU } from "@/constants/resource";
import NavElement from "../NavElement/NavElement";
import Typography from "../Typography/Typography";
import { useUserData } from "@/queries/userdata";
import { Role } from "@/interfaces/auth";
import { useNavigate } from "react-router-dom";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";

export default function Sidebar() {
  const { data: userData, isLoading } = useUserData();

  const navigate = useNavigate();

  const role = userData?.role;

  const isTeacher = role === Role.TEACHER;

  return (
    <div className="flex-[0_0_20%] mt-6 px-4">
      <div>
        <div className="bg-bgSecondary p-4 rounded-xl">
          {!isLoading && (
            <Typography weight="600">
              {isTeacher ? "Преподаватель" : "Администрация"}
            </Typography>
          )}
          {isLoading && <Spinner />}
        </div>

        <div className="mt-2">
          {RESOURCES.map(
            (resource) =>
              (role === Role.ADMIN || resource.roles?.includes(role!)) && (
                <NavElement
                  key={resource.id}
                  title={resource.title}
                  href={resource.href}
                  onCreateClick={() =>
                    resource.detailsHref &&
                    navigate(`office${resource.detailsHref}`)
                  }
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
