import Footer from "../../components/layouts/Footer/Footer";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import SheduleTarotReader from "../../components/partial/SheduleTarotReaderPage/SheduleTarotReader";

const SheduleTarotReaderPage = () => {
    return (
        <>
            <div className="flex">
                <TarotReaderSideBar />
                <SheduleTarotReader />
            </div>
            <Footer />
        </>
    );
};

export default SheduleTarotReaderPage
