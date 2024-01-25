import { Toaster } from "react-hot-toast";
import RootRouter from "./routes/RootRouter";
import "@/requests/request";

function App() {
  return (
    <>
      <RootRouter />
      <Toaster />
    </>
  );
}

export default App;
