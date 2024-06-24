import { useState, useEffect, useRef } from "react";
import { FaSistrix, FaCartShopping, FaAngleDown } from "react-icons/fa6";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LocalStorage from "../script/LocalStorage";

const navbarItems = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Shop", path: "/shop" },
  { id: 3, title: "Featured", path: "/featured" },
  { id: 4, title: "Recommended", path: "/recommended" },
];

function Header({ setSearchVal, setOpen, quantity }) {
  const [inputVal, setInputVal] = useState("");
  const [navbarItem, setNavbarItem] = useState(navbarItems[0]?.id);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Search product
  useEffect(() => {
    setSearchVal(inputVal);
  }, [inputVal, setSearchVal]);

  // useEffect(() => {
  //   const handleStickHeader = () => {
  //     const header = document.querySelector(".header_homepage");
  //     if (!header) return;

  //     console.log("ScrollY:", window.scrollY, "Header Height:", header.offsetHeight);

  //     if (window.scrollY >= header.offsetHeight) {
  //       header.classList.add("sticked");
  //       console.log("Header is sticked");
  //     } else {
  //       header.classList.remove("sticked");
  //       console.log("Header is not sticked");
  //     }
  //   };

  //   window.addEventListener("scroll", handleStickHeader);
  //   return () => {
  //     window.removeEventListener("scroll", handleStickHeader);
  //   };
  // }, []);

  function handleInputKeyEnter(e) {
    if (e.key === "Enter") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const value = e.target.value;
        setInputVal(value);
        if (value) {
          navigate("/shop");
        }
      }, 500);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleUserPopUp() {
    const popup = document.querySelector(".user-popup");
    popup.classList.toggle("open");
  }

  function handleLogOut() {
    LocalStorage.remove("loggedin");
    LocalStorage.remove("user");
    navigate("/signin");
  }

  function handleItemClick(id) {
    setNavbarItem(id);
  }

  return (
    <header className="header_homepage">
      <nav className="header_homepage-nav">
        <a href="/">
          <img src={require("../logo-full.png")} alt="logo" />
        </a>
        <ul className="left navbar-list">
          {navbarItems.map((item) => {
            return (
              <li className="navbar-list__item" key={item.id} onClick={() => handleItemClick(item.id)}>
                <Link to={item.path} className={item.id === navbarItem ? "active" : ""}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="right">
        <div className="right_search">
          <FaSistrix style={{ fontSize: "20px", verticalAlign: "middle" }} />
          <input type="text" placeholder="Search product ..." name="search_product_text" onKeyDown={handleInputKeyEnter} />
        </div>
        <div className="right_cart" onClick={() => setOpen(true)}>
          <FaCartShopping style={{ fontSize: "24px", marginLeft: "12px" }} />
          {quantity !== 0 ? <span className="right_cart-quantity">{quantity}</span> : ""}
        </div>
        <div className="right_user">
          {/* When user loged in */}
          {LocalStorage.isSet("loggedin") ? (
            <div onClick={handleUserPopUp} className="right_user-content">
              <span className="right_user-name">{LocalStorage.get("user").fullname}</span>
              {LocalStorage.get("user").avatar ? <img src={LocalStorage.get("user").avatar} alt="User" className="right_user-avatar" /> : <img src={require("../defaultAvatar.jpg")} alt="User" className="right_user-avatar" />}
              <FaAngleDown style={{ fontSize: "14px", marginLeft: "4px" }} />
              <div className="user-popup">
                <a href="/profile" className="view-account user-popup__item">
                  View Account
                  <FaRegUser style={{ float: "right", verticalAlign: "bottom" }} />
                </a>
                <a href="/" className="sign-out user-popup__item" onClick={handleLogOut}>
                  Sign Out
                  <FaSignOutAlt style={{ float: "right", verticalAlign: "bottom" }} />
                </a>
              </div>
            </div>
          ) : (
            // When user did not log in
            <div className="btn-group">
              <button type="button" className="signup-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
              <button type="button" className="signin-btn" onClick={() => navigate("/signin")}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
