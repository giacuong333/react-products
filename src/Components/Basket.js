import { useState, useEffect } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import LocalStorage from "../script/LocalStorage";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "./ConfirmPopup.js";

function Basket({ setOpen, setQuantity, isOpened }) {
  const [basket, setBasket] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [isShowCheckOut, setIsShowCheckOut] = useState(false); // Check an user is logged in or not. If so, go to the check out page

  const navigate = useNavigate();

  // Update the basket from localStorage when the basket is opened or the amount of the product is changed
  useEffect(() => {
    setBasket(LocalStorage.getStorage("basket"));
  }, [isOpened]);

  // Calculate total of order when the basket is changes
  useEffect(() => {
    setTotalOrder(() => {
      return basket
        .reduce((prev, cur) => {
          return prev + cur.price * cur.amount;
        }, 0)
        .toFixed(2);
    });
  }, [basket]);

  function handleCheckOutClicked() {
    const isLoggedIn = LocalStorage.get("loggedin");
    isLoggedIn ? navigate("/checkout/step1") : setIsShowCheckOut(true);
  }

  function handleCloseBasket() {
    setOpen(false);
  }

  function handeRemoveProduct(productId) {
    const updatedBasket = basket.filter((product) => product.id !== productId);
    LocalStorage.set("basket", updatedBasket);
    setBasket(updatedBasket);
    setQuantity(updatedBasket.length);
  }

  function handleClearBasket() {
    LocalStorage.remove("basket");
    setBasket([]);
    setQuantity(0);
  }

  function handleIncreaseAmount(productIndex) {
    const updatedBasket = basket.map((product, index) => {
      return index === productIndex ? { ...product, amount: product.amount + 1 } : product;
    });
    LocalStorage.set("basket", updatedBasket);
    setBasket(updatedBasket);
  }

  function handleDecreaseAmount(productIndex) {
    const updatedBasket = basket.map((product, index) => {
      return index === productIndex ? { ...product, amount: product.amount > 1 ? product.amount - 1 : 1 } : product;
    });
    LocalStorage.set("basket", updatedBasket);
    setBasket(updatedBasket);
  }

  function handleCloseConfirmPopup() {
    setIsShowCheckOut(false);
    setOpen(false);
  }

  function handleOkButtonClicked() {
    setIsShowCheckOut(false);
    navigate("/signin");
  }

  return (
    <>
      <div className={isOpened ? "basket open" : "basket"}>
        <div className="basket_header">
          <div className="basket_header-left">
            My Basket <span className="quantity">({basket.length <= 1 ? `${basket.length} item` : `${basket.length} items`})</span>
          </div>
          <div className="basket_header-right">
            <button type="button" onClick={handleCloseBasket}>
              Close
            </button>
            <button type="button" onClick={handleClearBasket}>
              Clear Basket
            </button>
          </div>
        </div>
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
                          <button type="button" className="increase_quantity" onClick={() => handleIncreaseAmount(index)}>
                            +
                          </button>
                          <button type="button" className="decrease_quantity" onClick={() => handleDecreaseAmount(index)}>
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
                          onClick={() => handeRemoveProduct(product.id)}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="basket_footer">
          <div className="basket_footer-left">
            Subtotal Amount: <br /> ${totalOrder}
          </div>
          <div className="basket_footer-right">
            <button className={`basket_footer-checkout ${basket.length === 0 ? "inactive" : ""}`} onClick={handleCheckOutClicked}>
              CHECK OUT
            </button>
          </div>
        </div>
      </div>

      <ConfirmPopup isShowed={isShowCheckOut} message={"You must sign in to continue checking out"} okButton={"Sign in to checkout"} cancelButton={"Continue shopping"} onWhiteOverlayClicked={handleCloseConfirmPopup} onCancelButtonClicked={handleCloseConfirmPopup} onOkButtonClicked={handleOkButtonClicked} />
    </>
  );
}

export default Basket;
