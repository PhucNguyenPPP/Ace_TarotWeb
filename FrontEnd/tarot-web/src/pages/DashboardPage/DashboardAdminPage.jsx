import Footer from "../../components/layouts/Footer/Footer";
import AdminSideBar from "../../components/layouts/Sidebar/AdminSidebar";
import DashboardAdmin from "../../components/partial/DashboardPage/DashboardAdmin";

const DashboardAdminPage = () => {
    return (
        <>
            <div className="flex">
                <AdminSideBar />
                <DashboardAdmin />
            </div>
            <Footer />
        </>
    );
};

export default DashboardAdminPage;
