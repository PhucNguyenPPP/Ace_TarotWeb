import Sidebar, { SidebarItem } from "./Sidebar.jsx";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function TarotReaderSideBar() {
    return (
        <Sidebar>
            <SidebarItem icon={<HomeOutlinedIcon/>} text={"Trang chủ"} href={"/home-tarot-reader"}/>
            <SidebarItem icon={<PersonOutlineOutlinedIcon />} text={"Quản lý trang"} href={"/page-tarot-reader"}/>
            <SidebarItem icon={<PersonOutlineOutlinedIcon />} text={"Quản lý trang"} href={"/page-tarot-reader"}/>
            <SidebarItem icon={<PersonOutlineOutlinedIcon />} text={"Quản lý trang"} href={"/page-tarot-reader"}/>
            <SidebarItem icon={<PersonOutlineOutlinedIcon />} text={"Quản lý trang"} href={"/page-tarot-reader"}/>
            <SidebarItem icon={<PersonOutlineOutlinedIcon />} text={"Quản lý trang"} href={"/page-tarot-reader"}/>
        </Sidebar>
    );
}
