import Sidebar, { SidebarItem } from "./Sidebar.jsx";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function AdminSideBar() {
    return (
        <Sidebar>
            <SidebarItem icon={<HomeOutlinedIcon/>} text={"Trang chủ"} href={"/home-admin"}/>
            <SidebarItem icon={<CalendarMonthIcon />} text={"Quản lý lịch làm"} href={"/slot-management-admin"}/>
        </Sidebar>
    );
}
