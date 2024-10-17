import Footer from "../../components/layouts/Footer/Footer";
import Header from "../../components/layouts/Header/Header";
import WaitingCheckoutPayOs from "../../components/partial/PaymentPage/WaitingCheckoutPayOs";

const WaitingCheckoutPayOsPage = () => {
    return (
        <>
            <Header />
            <WaitingCheckoutPayOs />
            <Footer />
        </>
    );
};

export default WaitingCheckoutPayOsPage;