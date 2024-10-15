import Footer from "../../components/layouts/Footer/Footer";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import DashboardTarotReader from "../../components/partial/DashboardPage/DashboardTarotReader";

const DashboardTarotReaderPage = () => {
    return (
        <>
            <div className="flex">
                <TarotReaderSideBar />
                <DashboardTarotReader />
            </div>
            <Footer />
        </>
    );
};

export default DashboardTarotReaderPage;
