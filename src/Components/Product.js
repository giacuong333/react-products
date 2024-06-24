import { useNavigate } from "react-router-dom";
import useFetch from "../customerHook/useFetch";

function Product({ searchVal }) {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");
  const navigate = useNavigate();

  if (error) return <div>Fetch error: {error.message}</div>;

  if (loading) return <div>Loading...</div>;

  const searchedProducts =
    searchVal === ""
      ? data.products
      : data.products.filter((product) => {
          return product.title.toLowerCase().includes(searchVal.toLowerCase());
        });

  return (
    <div className="products">
      {searchedProducts.map((product, index) => {
        return (
          <div className="product_card" key={index} onClick={() => navigate(`/product/${product.id}`)}>
            <img src={product.thumbnail} alt="" className="product-img" />
            <div className="product_info">
              <div className="product_info-title">{product.title}</div>
              <div className="product_info-brand">{product.brand}</div>
              <div className="product_info-price">${product.price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;
