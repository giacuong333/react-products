import { AiOutlineArrowRight, AiFillGoogleCircle } from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../script/users.js";
import LocalStorage from "../script/LocalStorage.js";
import { validateEmail, validateRequired, validatePassword } from "../script/validation.js";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  function handleFullNameInput() {
    setFullNameError("");
  }

  function handleFullNameBlur() {
    setFullNameError(validateRequired(fullname));
  }

  function handleEmailInput() {
    setEmailError("");
  }

  function handleEmailBlur() {
    setEmailError(validateRequired(email) || validateEmail(email));
  }

  function handlePasswordInput() {
    setPasswordError("");
  }

  function handlePasswordBlur() {
    setPasswordError(validateRequired(password) || validatePassword(password));
  }

  function handleSignUp() {
    const fullNameValidateError = validateRequired(fullname);
    const emailValidateError = validateRequired(email) || validateEmail(email);
    const passwordValidateError = validateRequired(password) || validatePassword(password);

    setFullNameError(fullNameValidateError);
    setEmailError(emailValidateError);
    setPasswordError(passwordValidateError);

    if (!fullNameValidateError && !emailValidateError && !passwordValidateError) {
      const users = LocalStorage.getStorage("users");
      const isExistingUser = users.some((user) => user.email === email);

      if (isExistingUser) {
        setEmailError("The email is existing");
        console.log("Existing");
      } else {
        const date = new Date();
        const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const user = new User(fullname, email, password, currentDate);
        LocalStorage.setStorage("users", user);
        alert("Sign up successfully");
        navigate("/signin");
      }
    }
  }

  return (
    <div className="sign-up-in-container">
      <h3 className="sign-up-in-header">Sign up to Salinaka</h3>
      <div className="sign-up-in-container__child">
        <div className="left">
          <div className="form-group">
            <label htmlFor="fullname" className={fullNameError ? "form-group__error" : ""}>
              {fullNameError || "* Full Name"}
            </label>
            <input type="text" id="fullname" placeholder="John Doe" className={fullNameError ? "error" : ""} onChange={(e) => setFullname(e.target.value)} value={fullname} onInput={handleFullNameInput} onBlur={handleFullNameBlur} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className={emailError ? "form-group__error" : ""}>
              {emailError || "* Email"}
            </label>
            <input type="email" id="email" placeholder="test@gmail.com" className={emailError ? "error" : ""} onChange={(e) => setEmail(e.target.value)} value={email} onInput={handleEmailInput} onBlur={handleEmailBlur} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className={passwordError ? "form-group__error" : ""}>
              {passwordError || "* Password"}
            </label>
            <input type="password" id="password" placeholder="Your password" className={passwordError ? "error" : ""} onChange={(e) => setPassword(e.target.value)} value={password} onInput={handlePasswordInput} onBlur={handlePasswordBlur} />
          </div>
          <div className="btn-group">
            <button type="button" className="signup-btn" onClick={handleSignUp}>
              Sign Up
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
          <p>Already have an account?</p>
          <div className="btn-group">
            <button className="signin-btn" onClick={() => navigate("/signin")}>
              Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Signup;
