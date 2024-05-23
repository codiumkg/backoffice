import { IUser } from "@/interfaces/user";
import { useUserProgress } from "@/queries/users";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LecturesTable from "../lectures/LecturesTable";
import TasksTable from "../tasks/TasksTable";

interface Props {
  student: IUser;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export default function StudentProgressModal({
  isOpen,
  onOpenChange,
  student,
}: Props) {
  const { userProgress, isUserProgressLoading } = useUserProgress(student.id);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h1 className="font-bold text-lg">
                Статистика успеваемости студента
              </h1>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center justify-center h-full">
                {isUserProgressLoading && <Spinner />}
                {!isUserProgressLoading && userProgress && (
                  <div className="flex flex-col w-full gap-10">
                    <div className="flex gap-8 items-center">
                      <div className="w-32 h-32">
                        <CircularProgressbar
                          value={userProgress?.percent || 0}
                          text={
                            !isUserProgressLoading
                              ? `${userProgress?.percent}%`
                              : "Загрузка..."
                          }
                          styles={buildStyles({
                            textSize: "14px",
                            strokeLinecap: "butt",
                            textColor: "hsl(var(--nextui-foreground))",
                            backgroundColor: "hsl(var(--nextui-background))",
                            pathColor: "hsl(var(--nextui-secondary))",
                            trailColor: "hsl(var(--nextui-highlight))",
                          })}
                        />
                      </div>

                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="font-bold">{student.username}</div>
                          <div className="font-light">
                            {student.profile?.firstName}{" "}
                            {student.profile?.lastName}
                          </div>
                        </div>

                        <div className="flex text-sm gap-12">
                          <div>
                            <h1 className="font-bold">
                              Всего завершено лекций
                            </h1>
                            <div>{userProgress.completedLectures.length}</div>
                          </div>
                          <div>
                            <h1 className="font-bold">Всего завершено задач</h1>
                            <div>{userProgress.completedTasks.length}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-12">
                      <div>
                        <h1>Список завершенных лекций</h1>

                        <div className="max-h-64 overflow-y-scroll mt-4">
                          <LecturesTable
                            lectures={userProgress.completedLectures || []}
                          />
                        </div>
                      </div>

                      <div>
                        <h1>Список завершенных задач</h1>
                        <div className="max-h-64 overflow-y-scroll mt-4">
                          <TasksTable
                            tasks={userProgress.completedTasks || []}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color="secondary">
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
