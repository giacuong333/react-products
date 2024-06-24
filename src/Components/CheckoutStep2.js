import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";

function CheckoutStep2() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/checkout/step1");
  }

  function handleNextStep() {
    navigate("/checkout/step3");
  }

  return <Checkout isShowBasket={false} isShowForm={true} step={2} header={"Shipping Details"} subHeader={""} negativeIconBtn={<GoArrowLeft style={{ fontSize: "16px", verticalAlign: "top", marginRight: "4px" }} />} positiveIconBtn={<GoArrowRight style={{ fontSize: "16px", verticalAlign: "top", marginLeft: "4px" }} />} negativeTextBtn={"Go Back"} positiveTextBtn={"Next step"} onNegativeBtnClicked={handleGoBack} onPositiveBtnClicked={handleNextStep} />;
}

export default CheckoutStep2;
