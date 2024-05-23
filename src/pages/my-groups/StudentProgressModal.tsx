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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h1 className="font-bold text-lg">
                Статистика успеваемости студента
              </h1>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center justify-center">
                {isUserProgressLoading && <Spinner />}
                {!isUserProgressLoading && (
                  <div className="flex flex-col w-full">
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

                      <div>
                        <div className="font-bold">{student.username}</div>
                        <div className="font-light">
                          {student.profile?.firstName}{" "}
                          {student.profile?.lastName}
                        </div>
                        <div>{student.phone}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color="primary">
                ОК
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
