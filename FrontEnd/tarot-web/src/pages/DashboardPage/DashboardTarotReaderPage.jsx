import Footer from "../../components/layouts/Footer/Footer";
import AdminSideBar from "../../components/layouts/Sidebar/AdminSidebar";
import DashboardTarotReader from "../../components/partial/DashboardPage/DashboardTarotReader";

const DashboardTarotReaderPage = () => {
    return (
        <>
            <div className="flex">
                <AdminSideBar />
                <DashboardTarotReader />
            </div>
            <Footer />
        </>
    );
};

export default DashboardTarotReaderPage;
