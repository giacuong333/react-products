import { Link } from "react-router-dom";
import Feature from "./Feature";
import ProductFeatured from "./ProductFeatured";

function Home() {
  return (
    <div className="home">
      <Feature image={require("../banner-home.png")} title={"See everything with Clarity"} description={"Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered."} isShowButton={true} buttonText={"Shop Now"} destination={"/shop"} />
      <div className="featured-products">
        <p>Featured Products</p>
        <span>
          <Link to="/shop" style={{ color: "#1a1a1a", fontWeight: "500", fontSize: "1.2rem" }}>
            See All
          </Link>
        </span>
      </div>
      <ProductFeatured startIndex={0} endIndex={6} />

      <div className="featured-products">
        <p>Recommended Products</p>
        <span>
          <Link to="/shop" style={{ color: "#1a1a1a", fontWeight: "500", fontSize: "1.2rem" }}>
            See All
          </Link>
        </span>
      </div>
      <ProductFeatured startIndex={8} endIndex={14} />
    </div>
  );
}

export default Home;
