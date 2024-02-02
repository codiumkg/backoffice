import cn from "classnames";
import styles from "./ContextMenu.module.scss";

interface MenuItem {
  id: string;
  title: string;
  onClick: () => void;
}

interface Props {
  items: MenuItem[];
  show: boolean;
}

function ContextMenu({ items, show }: Props) {
  return (
    <>
      {show && (
        <div className={styles.wrapper}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={item.onClick}
              className={cn(
                styles.menuItem,
                item.id === "delete" ? styles.deleteItem : ""
              )}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ContextMenu;
