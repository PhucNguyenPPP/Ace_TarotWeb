import Footer from "../../components/layouts/Footer/Footer";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import ServiceTypeTarotReader from "../../components/partial/ServiceTypeTarotReaderPage/ServiceTypeTarotReader";

const ServiceTypeTarotReaderPage = () => {
    return (
        <>
            <div className="flex">
                <TarotReaderSideBar />
                <ServiceTypeTarotReader />
            </div>
            <Footer />
        </>
    );
};

export default ServiceTypeTarotReaderPage;
