import "./App.css";
import { CreateForm } from "./components/CreateForm/CreateForm";
import { DashBoard } from "./components/DashBoard/DashBoard";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { SetUpComponent } from "./components/SetUpComponent/SetUpComponent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CreateForm />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
    {
      path: "/todo/:id",
      element: <CreateForm />,
    },
  ]);

  return (
    <SetUpComponent>
      <div className="container mx-auto p-10">
        <RouterProvider router={router} />
      </div>
    </SetUpComponent>
  );
}

export default App;
