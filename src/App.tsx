import { Toaster } from "react-hot-toast";
import RootRouter from "./routes/RootRouter";

function App() {
  return (
    <>
      <RootRouter />
      <Toaster />
    </>
  );
}

export default App;
