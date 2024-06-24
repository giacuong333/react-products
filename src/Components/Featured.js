import Feature from "./Feature";
import ProductFeatured from "./ProductFeatured";

function Featured() {
  return (
    <div className="featured">
      <Feature image={require("../banner-featured.png")} title={"Featured Products"} description={""} isShowButton={false} />
      <br />
      <br />
      <br />
      <ProductFeatured startIndex={0} endIndex={8} />
    </div>
  );
}

export default Featured;
