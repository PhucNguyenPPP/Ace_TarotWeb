import Footer from "../../components/layouts/Footer/Footer";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import FormMeetingManagement from "../../components/partial/FormMeetingMangementPage/FormMeetingManagement";

const FormMeetingManagementPage = () => {
    return (
        <>
            <div className="flex">
                <TarotReaderSideBar />
                <FormMeetingManagement />
            </div>
            <Footer />
        </>
    );
};

export default FormMeetingManagementPage;
