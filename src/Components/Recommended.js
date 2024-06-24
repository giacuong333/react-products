import { Link } from "react-router-dom";
import Feature from "./Feature";
import ProductFeatured from "./ProductFeatured";

function Recommended() {
  return (
    <div className="recommended">
      <Feature image={require("../banner-recommended.png")} title={"Recommended Products"} description={""} isShowButton={false} />
      <br />
      <br />
      <br />
      <ProductFeatured startIndex={8} endIndex={14} />
    </div>
  );
}

export default Recommended;
