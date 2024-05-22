import { RESOURCES, TEACHER_MENU } from "@/constants/resource";
import NavElement from "../NavElement/NavElement";
import Typography from "../Typography/Typography";
import { useUserData } from "@/queries/userdata";
import { Role } from "@/interfaces/auth";
import { useNavigate } from "react-router-dom";
import { Listbox, ListboxItem } from "@nextui-org/react";

export default function Sidebar() {
  const { data: userData } = useUserData();

  const navigate = useNavigate();

  const role = userData?.role;

  const isTeacher = role === Role.TEACHER;

  return (
    <div className="flex-[0_0_20%] mt-6 px-4">
      <div>
        <div className="bg-bgSecondary p-4 rounded-xl">
          <Typography weight="600">
            {isTeacher ? "Преподаватель" : "Администрация"}
          </Typography>
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

          {isTeacher && (
            <Listbox items={TEACHER_MENU} variant="flat">
              {(item) => (
                <ListboxItem
                  key={item.id}
                  onClick={() => navigate(item.href)}
                  description={item.description}
                >
                  <h1 className="font-bold">{item.title}</h1>
                </ListboxItem>
              )}
            </Listbox>
          )}
        </div>
      </div>
    </div>
  );
}
