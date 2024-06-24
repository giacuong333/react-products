import { useNavigate } from "react-router-dom";
import useFetch from "../customerHook/useFetch";

function ProductFeatured({ startIndex, endIndex }) {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");

  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Fecthing error: {error.message}</div>;

  return (
    <div className="product-featured">
      {data.products.slice(startIndex, endIndex).map((product) => {
        return (
          <div key={product.id} className="product-featured__item" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="product-featured__item-img">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="product-featured__item-info">
              <div className="product-featured__item-title">{product.title}</div>
              <i className="product-featured__item-description">{product.brand}</i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductFeatured;
