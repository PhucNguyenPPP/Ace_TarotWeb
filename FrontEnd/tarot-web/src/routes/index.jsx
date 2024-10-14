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
import WaitingCheckoutPage from "../pages/PaymentPage/WaitingCheckoutPage";
import ChatListPage from "../pages/ChatPage/ChatListPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import RoleBasedGuard from "../guards/RoleBasedGuard";
import SheduleTarotReaderPage from "../pages/SheduleTarotReaderPage/SheduleTarotReaderPage";
import GuestAuth from "../guards/GuestGuard";
import DashboardAdminPage from "../pages/DashboardPage/DashboardPage";
import ServiceTypeTarotReaderPage from "../pages/ServiceTypeTarotReaderPage/ServiceTypeTarotReaderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <GuestAuth><LoginPage /></GuestAuth>,
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
    element: <RoleBasedGuard accessibleRoles={["Customer", "Tarot Reader"]}><BookingPage /></RoleBasedGuard>,
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
    element: <RoleBasedGuard accessibleRoles={["Customer", "Tarot Reader"]} status="Active"><BookingListPage /></RoleBasedGuard>,
    errorElement: <Error />,
  },
  {
    path: "/booking-detail",
    element: <RoleBasedGuard accessibleRoles={["Customer", "Tarot Reader"]} status="Active"><BookingDetailPage /></RoleBasedGuard>,
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
  { path: "/waiting-checkout", 
    element: <WaitingCheckoutPage />, 
    errorElement: <Error/> 
  },
  { path: "/chat-list", 
    element: <RoleBasedGuard accessibleRoles={["Customer", "Tarot Reader"]} status="Active"><ChatListPage /></RoleBasedGuard>,
    errorElement: <Error/> 
  },
  { path: "/chat", 
    element: <RoleBasedGuard accessibleRoles={["Customer", "Tarot Reader"]} status="Active"><ChatPage/></RoleBasedGuard>,
    errorElement: <Error/> 
  },
  { path: "/shedule-tarot-reader", 
    element: <RoleBasedGuard accessibleRoles={["Tarot Reader"]} status="Active"><SheduleTarotReaderPage /></RoleBasedGuard>,
    errorElement: <Error/> 
  },
  {
    path: "/home-tarot-reader", 
    element: <RoleBasedGuard accessibleRoles={["Tarot Reader"]} status="Active"><HomeTarotReaderPage/></RoleBasedGuard>,
    errorElement: <Error/> 
  },
  {
    path: "/home-admin", 
    element: <RoleBasedGuard accessibleRoles={["Admin"]} status="Active"><DashboardAdminPage /></RoleBasedGuard>,
    errorElement: <Error/> 
  },
  {
    path: "/service-type-tarot-reader", 
    element: <RoleBasedGuard accessibleRoles={["Tarot Reader"]} status="Active"><ServiceTypeTarotReaderPage /></RoleBasedGuard>,
    errorElement: <Error/> 
  }
]);

