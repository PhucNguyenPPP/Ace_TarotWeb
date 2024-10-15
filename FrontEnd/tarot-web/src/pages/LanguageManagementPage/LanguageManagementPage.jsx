import Footer from "../../components/layouts/Footer/Footer";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import LanguageManagement from "../../components/partial/LanguageManagementPage.jsx/LanguageManagement";

const LanguageManagementPage = () => {
    return (
        <>
            <div className="flex">
                <TarotReaderSideBar />
                <LanguageManagement />
            </div>
            <Footer />
        </>
    );
};

export default LanguageManagementPage;
