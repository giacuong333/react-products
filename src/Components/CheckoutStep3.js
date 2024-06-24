import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import { GoArrowLeft } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import Popup from "./Popup";

function CheckoutStep3() {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/checkout/step2");
  }

  function handleNextStep() {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }

  return (
    <>
      <Checkout isShowPayment={true} step={3} header={"Payment"} subHeader={""} negativeIconBtn={<GoArrowLeft style={{ fontSize: "16px", verticalAlign: "top", marginRight: "4px" }} />} positiveIconBtn={<FaCheck style={{ fontSize: "16px", verticalAlign: "top", marginRight: "4px" }} />} negativeTextBtn={"Go Back"} positiveTextBtn={"Confirm"} onNegativeBtnClicked={handleGoBack} onPositiveBtnClicked={handleNextStep} />
      <Popup message={"Feature ís not ready yet."} isVisible={showPopup} />
    </>
  );
}

export default CheckoutStep3;
