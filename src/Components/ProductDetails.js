import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import Popup from "./Popup";
import LocalStorage from "../script/LocalStorage";
import ProductFeatured from "./ProductFeatured";

function ProductDetails({ setQuantity, setOpen }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Fetch API
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchProduct();
  }, [id]);

  // Update localStorage and quantity whenever productStorage changes
  useEffect(() => {
    const basket = LocalStorage.getStorage("basket");
    setQuantity(basket.length);
  }, [setQuantity]);

  // Add product to basket and localStorage
  function handleAddProductToBasket() {
    const productStorage = LocalStorage.getStorage("basket");
    // Check if the product already exists in the basket
    const existingProductIndex = productStorage.findIndex((item) => item.id === product.id);
    let updatedProductStorage = [];
    if (existingProductIndex !== -1) {
      // If product exists, increase the amount
      updatedProductStorage = productStorage.map((item, index) => {
        return index === existingProductIndex ? { ...item, amount: item.amount + 1 } : item;
      });
    } else {
      // Else set amount by 1
      updatedProductStorage = [...productStorage, { ...product, amount: 1 }];
    }
    LocalStorage.set("basket", updatedProductStorage);
    setQuantity(updatedProductStorage.length);
    setOpen(false);
    setIsPopupVisible(true);
    setPopupMessage("Add item to basket successfully");
    setTimeout(() => setIsPopupVisible(false), 2000);
  }

  if (error) return <div>Fetch error: {error}</div>;

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <a href="/" className="back_to_shop">
        <FaAngleLeft />
        <i>Back To Shop</i>
      </a>
      <div className="product_details">
        <img src={product.thumbnail} alt={product.title} className="product-img" />
        <div className="product_info">
          <h1 className="product_details-title">{product.title}</h1>
          <p className="product_details-desc">{product.description}</p>
          <div className="product_details-price">${product.price}</div>
          <button type="button" className="add_to_basket" onClick={handleAddProductToBasket}>
            Add To Basket
          </button>
        </div>
      </div>
      <div className="featured-products">
        <p>Recommended Products</p>
        <span>
          <Link to="/shop" style={{ color: "#1a1a1a", fontWeight: "500", fontSize: "1.2rem" }}>
            See All
          </Link>
        </span>
      </div>
      <ProductFeatured startIndex={8} endIndex={14} />
      <Popup message={popupMessage} isVisible={isPopupVisible} />
    </>
  );
}

export default ProductDetails;
