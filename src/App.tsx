import { ToastContainer } from "react-toastify";
import { TaskList } from "./components/TaskList/TaskList";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <TaskList />
    </QueryClientProvider>
  );
};
