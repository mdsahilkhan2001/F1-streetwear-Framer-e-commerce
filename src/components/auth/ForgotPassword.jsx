import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("type", "send-otp");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyUto-wa2f2odyn25Rk1TZBRVZ3poGCXGI67H2Gcu_y1x1ekwvEqdi3jQGvXUniARub8Q/exec",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      if (result.result === "success") {
        setOtpSent(true);
        toast.success("✅ OTP sent to your email.");
      } else {
        toast.error("❌ Failed to send OTP.");
      }
    } catch {
      toast.error("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("❌ Passwords do not match.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
    formData.append("newPassword", newPassword);
    formData.append("type", "reset-password");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyUto-wa2f2odyn25Rk1TZBRVZ3poGCXGI67H2Gcu_y1x1ekwvEqdi3jQGvXUniARub8Q/exec",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      if (result.result === "success") {
        toast.success("✅ Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(result.message || "❌ Failed to reset password.");
      }
    } catch {
      toast.error("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          otpSent ? resetPassword() : sendOtp();
        }}
        className="bg-white p-6 shadow-md rounded-xl w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {otpSent ? "Reset Password" : "Forgot Password"}
        </h2>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          disabled={otpSent}
        />

        {otpSent && (
          <>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border p-2 rounded mb-4"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full border p-2 rounded pr-10"
              />
              <span
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full border p-2 rounded mb-4"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {otpSent ? "Resetting..." : "Sending..."}
            </>
          ) : otpSent ? (
            "Reset Password"
          ) : (
            "Send OTP"
          )}
        </button>
      </form>
    </div>
  );
}
