import Footer from "../../components/layouts/Footer/Footer";
import AdminSideBar from "../../components/layouts/Sidebar/AdminSidebar";
import SlotManagementAdmin from "../../components/partial/SlotManagementAdminPage/SlotManagementAdmin";

const SlotManagementAdminPage = () => {
    return (
        <>
            <div className="flex">
                <AdminSideBar />
                <SlotManagementAdmin />
            </div>
            <Footer />
        </>
    );
};

export default SlotManagementAdminPage
