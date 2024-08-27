import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import IntroductionPage from "../pages/IntroductionPage/IntroductionPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/introduction",
    element: <IntroductionPage />,
    errorElement: <Error />,
  }
]);

