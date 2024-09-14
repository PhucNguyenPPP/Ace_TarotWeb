import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/AuthenPage/LoginPage";
import IntroductionPage from "../pages/IntroductionPage/IntroductionPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import TarotReaderListPage from "../pages/TarotReaderPage/TarotReaderListPage";
import TarotReaderDetailPage from "../pages/TarotReaderPage/TarotReaderDetailPage";
import BookingPage from "../pages/BookingPage/BookingPage";
import RoleSignUpPage from "../pages/AuthenPage/RoleSignUpPage";
import SignUpCustomerPage from "../pages/AuthenPage/SignUpCustomerPage";
import BookingListPage from "../pages/BookingListPage/BookingListPage";
import BookingDetailPage from "../pages/BookingListPage/BookingDetailPage";
import SignUpTarotReaderPage from "../pages/AuthenPage/SignUpTarotReaderPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ForgotPasswordPage from "../pages/AuthenPage/ForgotPasswordPage";
import HomeTarotReaderPage from "../pages/HomePage/HomeTarotReaderPage";

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
  },
  {
    path: "/tarot-reader-list",
    element: <TarotReaderListPage />,
    errorElement: <Error />,
  },
  {
    path: "/tarot-reader-detail",
    element: <TarotReaderDetailPage />,
    errorElement: <Error />,
  },
  {
    path: "/booking-step",
    element: <BookingPage />,
    errorElement: <Error />,
  },
  {
    path: "/role-signup",
    element: <RoleSignUpPage />,
    errorElement: <Error />,
  },
  {
    path: "/signup-customer",
    element: <SignUpCustomerPage />,
    errorElement: <Error />,
  },
  {
    path: "/signup-tarot-reader",
    element: <SignUpTarotReaderPage />,
    errorElement: <Error />,
  },
  {
    path: "/booking-list",
    element: <BookingListPage />,
    errorElement: <Error />,
  },
  {
    path: "/booking-detail",
    element: <BookingDetailPage />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    errorElement: <Error />,
  },
  {
    path: "/home-tarot-reader",
    element: <HomeTarotReaderPage />,
    errorElement: <Error />,
  }
]);

