import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import { LoaderProvider } from "./context/LoaderContext";

function App() {
  return (
    <>
      <LoaderProvider>
        <AuthProvider>
        <Loader />
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
      </LoaderProvider>
    </>
  );
}

export default App;
