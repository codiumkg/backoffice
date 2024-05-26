import { RiDraggable } from "react-icons/ri";
import { ITopicContent } from "@/interfaces/topicContent";
import styles from "./ContentCard.module.scss";
import Typography from "@/components/shared/Typography/Typography";
import { cleanHtml } from "@/utils/utils";
import { useSortable } from "@dnd-kit/sortable";

interface Props {
  topicContent: ITopicContent;
}

export default function ContentCard({ topicContent }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: topicContent.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const CONTENT_TYPE = {
    LECTURE: "Лекция",
    TASK: "Задача",
  };

  return (
    <div
      className={styles.card}
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <RiDraggable className="flex-shrink-0 text-2xl" />
      <Typography variant="h1" weight="600">
        {topicContent.orderNumber}
      </Typography>

      <div>
        <Typography variant="body1" weight="600">
          {CONTENT_TYPE[topicContent.type]}
        </Typography>
        <Typography variant="body3" weight="200">
          {topicContent.lecture?.title}
          {cleanHtml(topicContent.task?.text || "")}
        </Typography>
      </div>
    </div>
  );
}
