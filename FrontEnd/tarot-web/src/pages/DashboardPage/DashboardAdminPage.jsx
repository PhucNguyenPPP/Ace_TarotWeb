import Footer from "../../components/layouts/Footer/Footer";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import DashboardAdmin from "../../components/partial/DashboardPage/DashboardAdmin";

const DashboardAdminPage = () => {
    return (
        <>
            <div className="flex">
                <TarotReaderSideBar />
                <DashboardAdmin />
            </div>
            <Footer />
        </>
    );
};

export default DashboardAdminPage;
