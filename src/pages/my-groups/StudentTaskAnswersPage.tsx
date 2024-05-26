import { useTaskUserAnswers } from "@/queries/tasks";
import { useParams } from "react-router-dom";
import cn from "classnames";
import { Spinner } from "@nextui-org/react";

export default function StudentTaskAnswersPage() {
  const { id } = useParams();

  const { userAnswers, isUserAnswersLoading } = useTaskUserAnswers(+id!);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold">Результаты студента</h1>

      {isUserAnswersLoading && (
        <div className="py-20">
          <Spinner />
        </div>
      )}
      {!isUserAnswersLoading && userAnswers && (
        <div className="grid gap-4">
          {!userAnswers.length && (
            <div className="bg-bgSecondary p-4 rounded-xl">
              Результаты не найдены.
            </div>
          )}
          {userAnswers.map((answer) => (
            <div
              className="flex flex-col p-6 rounded-xl bg-bgSecondary gap-2"
              key={answer.id}
            >
              <h1 className="text-xs font-light">{answer.task.topic.title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: answer.task.text }}
                className="bg-background rounded-xl px-4 py-1"
              ></div>

              <div
                className={cn(
                  "flex gap-3",
                  answer.answer ? "flex-row items-center" : "flex-col"
                )}
              >
                <h2 className="text-sm font-light">Ответ студента: </h2>

                {answer.answer ? (
                  <div
                    className={cn(
                      "px-4 py-1 rounded-xl text-background",
                      answer.answer.isCorrectAnswer
                        ? "bg-green-600"
                        : "bg-red-600"
                    )}
                  >
                    <div className="text-sm">{answer.answer.text}</div>
                  </div>
                ) : (
                  <div className="p-4 bg-background rounded-xl">
                    <div
                      dangerouslySetInnerHTML={{ __html: answer.text }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
