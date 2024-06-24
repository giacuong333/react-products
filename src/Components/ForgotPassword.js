import { FaCheck } from "react-icons/fa6";

function ForgotPassword() {
  return (
    <div className="sign-up-in-container forgotpassword">
      <h3 className="sign-up-in-header">Forgot Your Password?</h3>
      <p className="sign-up-in-subheader">Enter your email address and we will send you a password reset email.</p>
      <div className="form-group">
        <input type="email" placeholder="Enter your email" className="forgotpassword" />
      </div>
      <div className="btn-group">
        <button type="button" className="send-reset-pwd-btn">
          <FaCheck style={{ verticalAlign: "bottom", fontSize: "14px", marginRight: "8px" }} />
          Send Password Reset Email
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
