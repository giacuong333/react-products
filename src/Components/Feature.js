import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

function Feature({ image, title, description, isShowButton, buttonText, onClick, destination }) {
  return (
    <div className="feature">
      <div className="banner">
        <div className="banner-left">
          <div className="banner-left__title">{title}</div>
          <div className="banner-left__description">{description}</div>
          {isShowButton && (
            <Link to={destination} type="button" className="banner-left__button" onClick={onClick}>
              {buttonText}
              <GoArrowRight style={{ fontSize: "20px", verticalAlign: "middle", paddingLeft: "2px" }} />
            </Link>
          )}
        </div>
        <div className="banner-right">
          <img src={image} alt="Banner" />
        </div>
      </div>
    </div>
  );
}

export default Feature;
