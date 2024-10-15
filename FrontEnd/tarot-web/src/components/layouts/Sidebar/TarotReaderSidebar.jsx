import Sidebar, { SidebarItem } from "./Sidebar.jsx";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

export default function TarotReaderSideBar() {
    return (
        <Sidebar>
            <SidebarItem icon={<HomeOutlinedIcon/>} text={"Trang chủ"} href={"/home-tarot-reader"}/>
            <SidebarItem icon={<AssignmentOutlinedIcon />} text={"Quản lý lịch hẹn"} href={"/booking-list"}/>
            <SidebarItem icon={<CalendarMonthIcon />} text={"Quản lý lịch làm"} href={"/shedule-tarot-reader"}/>
            <SidebarItem icon={<WorkOutlineOutlinedIcon />} text={"Quản lý dịch vụ"} href={"/service-type-tarot-reader"}/>
            <SidebarItem icon={<ContactPhoneOutlinedIcon />} text={"Quản lý hình thức xem"} href={"/form-meeting-management-tarot-reader"}/>
            <SidebarItem icon={<PublicOutlinedIcon />} text={"Quản lý ngôn ngữ"} href={"/language-management-tarot-reader"}/>
            <SidebarItem icon={<PersonOutlineOutlinedIcon />} text={"Quản lý trang"} href={"/page-management-tarot-reader"}/>
        </Sidebar>
    );
}
