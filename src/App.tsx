import { Toaster } from "react-hot-toast";
import { cleanInterceptors, setInterceptors } from "./requests/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./hooks/useNotification";

function App() {
  const navigate = useNavigate();
  const { showErrorNotification } = useNotification();

  useEffect(() => {
    setInterceptors({ navigate, showNotification: showErrorNotification });

    return () => {
      cleanInterceptors();
    };
  }, [navigate, showErrorNotification]);

  return (
    <>
      <Toaster />
    </>
  );
}

export default App;
