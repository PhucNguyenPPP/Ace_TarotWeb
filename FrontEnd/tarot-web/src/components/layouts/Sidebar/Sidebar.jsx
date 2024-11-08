import { MoreVertical } from "lucide-react";
import { useContext, createContext, useState } from "react";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import useAuth from "../../../hooks/useAuth";
import { Logout } from "../../../api/AuthenApi";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await Logout(refreshToken)
    if (response.ok) {
        await logout();
        navigate("/login")
    }
}

  return (
    <aside className={`min-h-screen max-h-max ${expanded ? "w-64" : "w-16"}`}>
      <nav className="min-h-screen h-full flex flex-col bg-white border-r shadow-sm" style={{backgroundColor: '#FFD232'}}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="image/logo.png"
            style={{width: '90px', height: '90px'}}
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg hover:bg-gray-200"
          >
            {expanded ? <KeyboardDoubleArrowLeftIcon/> : <KeyboardDoubleArrowRightIcon />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={user.avatarLink}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user.fullName}</h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
            <LogoutIcon style={{ cursor: 'pointer'}} onClick={handleClickLogout} size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, href }) {
    const { expanded } = useContext(SidebarContext);
  
    return (
      <a href={href} className="no-underline">
        <li
          className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group h-12 ${
            active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-black"
          }`}
        >
          {icon}
          <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
            />
          )}
          {!expanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </li>
      </a>
    );
  }

