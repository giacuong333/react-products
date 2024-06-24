import { AiOutlineArrowRight, AiFillGoogleCircle } from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocalStorage from "../script/LocalStorage";
import { validateEmail, validatePassword, validateRequired } from "../script/validation";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  function handleNavigateSignUp() {
    navigate("/signup");
  }

  function handleEmailBlur() {
    setEmailError(validateRequired(email) || validateEmail(email));
  }

  function handlePasswordBlur() {
    setPasswordError(validateRequired(password) || validatePassword(password));
  }

  function handleEmailInput() {
    if (emailError) {
      setEmailError("");
    }
  }

  function handlePasswordInput() {
    if (passwordError) {
      setPasswordError("");
    }
  }

  function handleSignIn() {
    const emailValidateError = validateRequired(email) || validateEmail(email);
    const passwordValidateError = validateRequired(password) || validatePassword(password);

    setEmailError(emailValidateError);
    setPasswordError(passwordValidateError);

    if (!emailError && !passwordError) {
      const users = LocalStorage.getStorage("users");
      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        LocalStorage.set("loggedin", true);
        LocalStorage.set("user", user);
        alert("Log in successfully");
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    }
  }

  return (
    <div className="sign-up-in-container">
      <h3 className="sign-up-in-header">Sign in to Salinaka</h3>
      <div className="sign-up-in-container__child">
        <div className="left">
          <div className="form-group">
            <label htmlFor="email" className={emailError ? "form-group__error" : ""}>
              {emailError || "* Email"}
            </label>
            <input type="email" id="email" placeholder="test@gmail.com" onChange={(e) => setEmail(e.target.value)} value={email} onBlur={handleEmailBlur} onInput={handleEmailInput} className={emailError ? "error" : ""} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className={passwordError ? "form-group__error" : ""}>
              {passwordError || "* Password"}
            </label>
            <input type="password" id="password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} value={password} onBlur={handlePasswordBlur} onInput={handlePasswordInput} className={passwordError ? "error" : ""} />
          </div>
          <div className="btn-group">
            <a href="/forgotpassword" className="forgotpassword">
              Forgot password?
            </a>
            <button type="button" className="signup-btn" onClick={handleSignIn}>
              Sign In
              <AiOutlineArrowRight style={{ verticalAlign: "bottom", fontSize: "14px", marginLeft: "6px" }} />
            </button>
          </div>
        </div>
        <div className="middle">or</div>
        <div className="right">
          <div className="btn-group">
            <button type="button" className="fb-btn">
              <FaFacebook style={{ verticalAlign: "bottom", marginRight: "8px" }} />
              Continue with Facebook
            </button>
            <button type="button" className="gg-btn">
              <AiFillGoogleCircle style={{ verticalAlign: "bottom", marginRight: "8px" }} />
              Continue with Google
            </button>
            <button type="button" className="gh-btn">
              <FaGithub style={{ verticalAlign: "bottom", marginRight: "8px" }} />
              Continue with Github
            </button>
          </div>
        </div>
      </div>
      <footer className="sign-up-in-footer">
        <div className="sign-up-in-footer__content">
          <p>Don't have an account?</p>
          <div className="btn-group">
            <button className="signin-btn" onClick={handleNavigateSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Signin;
