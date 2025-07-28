 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("type", "login");

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
        setStatus("✅ You have successfully logged in.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setStatus("❌ Invalid credentials.");
      }
    } catch (err) {
      console.error(err)
      setStatus("⚠️ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-xl w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border p-2 rounded pr-10"
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {status && (
          <p className="text-center mt-4 text-sm text-gray-700">{status}</p>
        )}
      </form>
    </div>
  );
}
