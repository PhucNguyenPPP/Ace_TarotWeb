import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import IntroductionPage from "../pages/IntroductionPage/IntroductionPage";
import ContactPage from "../pages/ContactPage/ContactPage";
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
  },
  {
    path: "/contact",
    element: <ContactPage />,
    errorElement: <Error />,
  }
]);

