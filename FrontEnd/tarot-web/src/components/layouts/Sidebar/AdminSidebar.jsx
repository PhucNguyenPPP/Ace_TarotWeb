import Sidebar, { SidebarItem } from "./Sidebar.jsx";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function AdminSideBar() {
    return (
        <Sidebar>
            <SidebarItem icon={<HomeOutlinedIcon/>} text={"Trang chủ"} href={"/home-admin"}/>
            <SidebarItem icon={<CalendarMonthIcon />} text={"Quản lý lịch làm"} href={"/shedule-tarot-reader"}/>
            <SidebarItem icon={<PersonOutlineOutlinedIcon />} text={"Quản lý dịch vụ"} href={"/page-tarot-reader"}/>
        </Sidebar>
    );
}
