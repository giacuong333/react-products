import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="developer">
          Developer by <a href="https://github.com/giacuong333">KEN</a>
        </div>
        <div className="logo-and-copyright">
          <div className="logo">
            <Link to={"/"} style={{ textDecoration: "none", outline: "none", border: "none" }}>
              <img src={require("../logo-full.png")} alt="Logo" />
            </Link>
          </div>
          <div className="copyright">
            <FaRegCopyright />
            2024
          </div>
        </div>
        <div className="fork">
          Fork this project <a href="https://github.com/giacuong333/First-React-Project">HERE</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
