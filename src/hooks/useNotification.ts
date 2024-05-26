import { toast } from "react-hot-toast";

function showSuccessNotification(text: string = "Успешно") {
  toast.success(text, {
    className: "bg-bgSecondary text-foreground",
  });
}

function showErrorNotification(text: string = "Ошибка") {
  toast.error(text, {
    className: "bg-bgSecondary text-foreground",
  });
}

function showNotification(text: string) {
  toast(text, {
    icon: "⚠️",
    className: "bg-bgSecondary text-foreground",
  });
}

export function useNotification() {
  return {
    showSuccessNotification,
    showErrorNotification,
    showNotification,
  };
}
