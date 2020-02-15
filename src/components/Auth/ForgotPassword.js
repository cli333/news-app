import React, { useState, useContext } from "react";
import firebase, { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);

  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (error) {
      console.log("Error sending email", error);
      setIsPasswordReset(false);
      setPasswordResetError(error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={e => setResetPasswordEmail(e.target.value)}
      />
      <div>
        <button className="button" onClick={() => handleResetPassword()}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset Password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
