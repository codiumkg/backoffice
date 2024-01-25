import { toast } from "react-hot-toast";

function showSuccessNotification(text: string = "Успешно") {
  toast.success(text, {
    style: {
      background: "var(--secondary-color)",
      color: "var(--text-color)",
    },
  });
}

function showErrorNotification(text: string = "Ошибка") {
  toast.error(text, {
    style: {
      background: "var(--secondary-color)",
      color: "var(--text-color)",
    },
  });
}

export function useNotification() {
  return {
    showSuccessNotification,
    showErrorNotification,
  };
}
