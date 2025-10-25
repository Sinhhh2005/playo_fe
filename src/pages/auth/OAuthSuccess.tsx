// src/pages/auth/OAuthSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role") || "user";

    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);

      // 🔹 Phát event để Navbar hoặc các component khác cập nhật login state
      window.dispatchEvent(new Event("userChanged"));

      // ✅ Điều hướng theo role
      navigate(role === "admin" ? "/admin" : "/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Đang đăng nhập...</h2>
        <p className="text-gray-500 text-sm">Vui lòng đợi trong giây lát.</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
