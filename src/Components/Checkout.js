import { LiaTimesSolid } from "react-icons/lia";
import LocalStorage from "../script/LocalStorage";
import { useEffect, useState } from "react";
import { validateEmail, validatePhoneNumber, validateRequired } from "../script/validation";
import { FaCcMastercard, FaCcPaypal, FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { RiVisaFill } from "react-icons/ri";

function Checkout({ step, header, subHeader, positiveIconBtn, positiveTextBtn, negativeIconBtn, negativeTextBtn, onNegativeBtnClicked, onPositiveBtnClicked, isShowBasket, isShowForm, isShowPayment }) {
  const user = LocalStorage.get("user");

  const [basket, setBasket] = useState(LocalStorage.getStorage("basket"));
  const [total, setTotal] = useState(0);

  const [fullName, setFullName] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [internationalShipping, setInternationalShipping] = useState(false);

  // Calculate total of order
  useEffect(() => {
    setTotal(() => {
      let totalOfOrder = basket.reduce((prev, cur) => prev + cur.amount * cur.price, 0);

      if (internationalShipping) totalOfOrder += 50.0;

      return parseFloat(totalOfOrder.toFixed(2));
    });
  }, [basket, internationalShipping]);

  function handleFullNameChange(e) {
    setFullName(e.target.value);
  }

  function handleFullNameBlur() {
    setFullNameError(validateRequired(fullName));
  }

  function handleFullNameInput() {
    setFullNameError("");
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleEmailBlur() {
    setEmailError(validateRequired(email) || validateEmail(email));
  }

  function handleEmailInput() {
    setEmailError("");
  }

  function handleAddressChange(e) {
    setAddress(e.target.value);
  }

  function handleAddressBlur() {
    setAddressError(validateRequired(address));
  }

  function handleAddressInput() {
    setAddressError("");
  }

  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value);
  }

  function handlePhoneNumberBlur() {
    setPhoneNumberError(validateRequired(phoneNumber) || validatePhoneNumber(phoneNumber));
  }

  function handlePhoneNumberInput() {
    setPhoneNumberError("");
  }

  function handleShippingClicked() {
    setInternationalShipping((prev) => !prev);
  }

  function handleRemoveProduct(productId) {
    const updatedBasket = basket.filter((product) => product.id !== productId);
    LocalStorage.set("basket", updatedBasket);
    setBasket(updatedBasket);
  }

  function handleIncreaseQuantity(productIndex) {
    const updatedBasket = basket.map((product, index) => (index === productIndex ? { ...product, amount: product.amount + 1 } : product));
    LocalStorage.set("basket", updatedBasket);
    setBasket(updatedBasket);
  }

  function handleDecreaseQuantity(productIndex) {
    const updatedBasket = basket.map((product, index) => (index === productIndex ? { ...product, amount: product.amount > 1 ? product.amount - 1 : 1 } : product));
    LocalStorage.set("basket", updatedBasket);
    setBasket(updatedBasket);
  }

  return (
    <div className="checkout">
      <div className="process-bar">
        <div className="btn-group">
          <div className="btn-group__item">
            <button type="button" className={`${step === 1 ? "active" : ""}`}>
              1
            </button>
            <div className={`btn-group__item-description ${step === 1 ? "active" : ""}`}>Order Summary</div>
          </div>
          <div className="btn-group__item">
            <button type="button" className={`${step === 2 ? "active" : ""}`}>
              2
            </button>
            <div className={`btn-group__item-description ${step === 2 ? "active" : ""}`}>Shipping Details</div>
          </div>
          <div className="btn-group__item">
            <button type="button" className={`${step === 3 ? "active" : ""}`}>
              3
            </button>
            <div className={`btn-group__item-description ${step === 3 ? "active" : ""}`}>Payment</div>
          </div>
        </div>
      </div>

      <div className="checkout-title">
        <p className="checkout-title__header">{header}</p>
        <p className="checkout-title__subheader">{subHeader}</p>
      </div>

      {isShowBasket && (
        <>
          <div className="basket_body">
            <div className="basket_product_list">
              {basket.length === 0
                ? "Your basket is empty"
                : basket.map((product, index) => {
                    const totalPrice = Number(product.amount * product.price).toFixed(2);
                    return (
                      <div className="product_item" key={index}>
                        <div className="product_item-left">
                          <div className="product_item-left__btn-group">
                            <button type="button" className="increase_quantity" onClick={() => handleIncreaseQuantity(index)}>
                              +
                            </button>
                            <button type="button" className="decrease_quantity" onClick={() => handleDecreaseQuantity(index)}>
                              -
                            </button>
                          </div>
                          <div className="product_item-info__group">
                            <img src={product.thumbnail} alt="Product" />
                            <div className="product_item-info__info">
                              <span className="product_item-info-title">{product.title}</span>
                              <span className="product_item-info-quantity">Quantity</span>
                              <span className="product_item-info-quantity-number">{product.amount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="product_item-right">
                          <div className="product_item-right__price">${totalPrice}</div>
                          <LiaTimesSolid
                            style={{
                              fontSize: "40px",
                              fontWeight: "normal",
                              marginLeft: "4px",
                              border: "1px solid #ccc",
                              padding: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleRemoveProduct(product.id)}
                          />
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>

          <div className="checkout-price">
            <p className="checkout-price__title">Subtotal</p>
            <p className="checkout-price__money">${total}</p>
          </div>
        </>
      )}

      {isShowForm && (
        <div className="shipping-details">
          <div className="shipping-details__form">
            <div className="form-group">
              <label htmlFor="fullname" className={fullNameError ? "form-group__error" : ""}>
                {fullNameError || "* Full name"}
              </label>
              <input type="text" id="fullname" placeholder="Enter your full name" className={fullNameError ? "error" : ""} value={fullName} onChange={handleFullNameChange} onBlur={handleFullNameBlur} onInput={handleFullNameInput} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className={emailError ? "form-group__error" : ""}>
                {emailError || "* Email"}
              </label>
              <input type="email" id="email" placeholder="test@gmail.com" className={emailError ? "error" : ""} value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} onInput={handleEmailInput} />
            </div>
            <div className="form-group">
              <label htmlFor="address" className={addressError ? "form-group__error" : ""}>
                {addressError || "* Shipping Address"}
              </label>
              <input type="text" id="address" placeholder="Enter full shiping address" className={addressError ? "error" : ""} value={address} onChange={handleAddressChange} onBlur={handleAddressBlur} onInput={handleAddressInput} />
            </div>
            <div className="form-group">
              <label htmlFor="phonenumber" className={phoneNumberError ? "form-group__error" : ""}>
                {phoneNumberError || "* Mobile Number"}
              </label>
              <input type="text" id="phonenumber" placeholder="0956623156" className={phoneNumberError ? "error" : ""} value={phoneNumber} onChange={handlePhoneNumberChange} onBlur={handlePhoneNumberBlur} onInput={handlePhoneNumberInput} />
            </div>
          </div>

          <div className="shipping-details__option">
            <div className="shipping-details__option-title">Shipping Option</div>

            <div className="shipping-details__option-main" onClick={handleShippingClicked}>
              <span className="shipping-details__option-main-left">
                <FaCircleCheck
                  style={{
                    opacity: internationalShipping ? 1 : 0,
                    visibility: internationalShipping ? "visible" : "hidden",
                    position: internationalShipping ? "static" : "absolute",
                    transition: "all 0.3s ease-in-out",
                    fontSize: "24px",
                    marginRight: "10px",
                  }}
                />
                <FaRegCheckCircle
                  style={{
                    opacity: internationalShipping ? 0 : 1,
                    visibility: internationalShipping ? "hidden" : "visible",
                    transition: "all 0.3s ease-in-out",
                    position: internationalShipping ? "absolute" : "static",
                    fontSize: "24px",
                    marginRight: "10px",
                  }}
                />
                <p className="international-shipping">
                  International Shipping <span>7-14 days</span>
                </p>
              </span>
              <span className="shipping-details__option-main-right">
                <p>$50.00</p>
              </span>
            </div>
          </div>

          <div className="shipping-details__price">
            <div className="shipping-details__price-1">
              <p className="shipping-details__price-1-title">International Shipping: </p>
              <p className="shipping-details__price-1-money">${internationalShipping ? "50.00" : "0.00"}</p>
            </div>
            <div className="shipping-details__price-2">
              <p className="shipping-details__price-2-title">Subtotal: </p>
              <p className="shipping-details__price-2-money">${total}</p>
            </div>
            <div className="shipping-details__price-3">
              <p className="shipping-details__price-3-title">Total: </p>
              <p className="shipping-details__price-3-money">${total}</p>
            </div>
          </div>
        </div>
      )}

      {isShowPayment && (
        <div className="shipping-details__option">
          <div className="shipping-details__option-title">Payment Option</div>

          <div className="shipping-details__option-main paypal">
            <span className="shipping-details__option-main-left paypal">
              {/* <FaCircleCheck style={{ fontSize: "24px" }} /> */}
              <FaRegCheckCircle style={{ fontSize: "24px", marginRight: "10px" }} />
              <p className="international-shipping">
                Credit Card <span>Pay with Visa, Master Card and other debit or credit card.</span>
              </p>
            </span>
            <span className="shipping-details__option-main-right">
              <p>
                <RiVisaFill style={{ fontSize: "50px", marginRight: "10px" }} />
                <FaCcMastercard style={{ fontSize: "50px" }} />
              </p>
            </span>
          </div>
          <div className="shipping-details__option-main paypal">
            <span className="shipping-details__option-main-left paypal">
              {/* <FaCircleCheck style={{ fontSize: "24px" }} /> */}
              <FaRegCheckCircle style={{ fontSize: "24px", marginRight: "10px" }} />
              <p className="international-shipping">
                PayPal <span>Pay easily, fast and secure with PayPal.</span>
              </p>
            </span>
            <span className="shipping-details__option-main-right">
              <p>
                <FaCcPaypal style={{ fontSize: "50px" }} />
              </p>
            </span>
          </div>

          <div className="shipping-details__price-3 paypal">
            <p className="shipping-details__price-3-title">Total: </p>
            <p className="shipping-details__price-3-money">$647.00</p>
          </div>
        </div>
      )}

      <div className="checkout-actions">
        <div className="btn-group">
          <button type="button" onClick={onNegativeBtnClicked}>
            {negativeIconBtn}
            {negativeTextBtn}
            {/* <FaStore } /> Continue Shopping */}
          </button>
          <button type="button" onClick={onPositiveBtnClicked}>
            {step === 2 || step === 1 ? (
              <>
                {positiveTextBtn}
                {positiveIconBtn}
              </>
            ) : (
              <>
                {positiveIconBtn}
                {positiveTextBtn}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
