import Checkout from "./Checkout";
import { FaStore } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function CheckoutStep1() {
  const navigate = useNavigate();

  function handleBackToShopClicked() {
    navigate("/shop");
  }

  function handleMoveOnToNextStep() {
    navigate("/checkout/step2");
  }

  return <Checkout isShowBasket={true} step={1} header={"Order Summary"} subHeader={"Review items in your basket."} negativeIconBtn={<FaStore style={{ fontSize: "16px", verticalAlign: "top", marginRight: "4px" }} />} positiveIconBtn={<GoArrowRight style={{ fontSize: "16px", verticalAlign: "top", marginLeft: "4px" }} />} negativeTextBtn={"Continue Shopping"} positiveTextBtn={"Next step"} onNegativeBtnClicked={handleBackToShopClicked} onPositiveBtnClicked={handleMoveOnToNextStep} />;
}

export default CheckoutStep1;
