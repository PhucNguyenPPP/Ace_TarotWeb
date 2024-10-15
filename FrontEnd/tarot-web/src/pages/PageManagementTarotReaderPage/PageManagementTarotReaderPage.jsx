import Footer from "../../components/layouts/Footer/Footer";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import PageManagementTarotReader from "../../components/partial/PageManagementTarotReaderPage/PageManagementTarotReader";
const PageManagementTarotReaderPage = () => {
    return (
        <>
            <div className="flex">
                <TarotReaderSideBar />
                <PageManagementTarotReader />
            </div>
            <Footer />
        </>
    );
};

export default PageManagementTarotReaderPage;
