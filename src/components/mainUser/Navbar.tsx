import { Link, useNavigate } from "react-router-dom";
import { FaRunning, FaBaseballBall, FaChalkboardTeacher, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("accessToken");
      const userName = localStorage.getItem("userName");

      if (token && userName) {
        setIsLoggedIn(true);
        setUserName(userName);
      } else {
        setIsLoggedIn(false);
        setUserName("User");
      }
    };

    loadUser();

    // Lắng nghe thay đổi localStorage (khi login/logout ở các component khác)
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setOpen(false);
    navigate("/login");
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".profile-dropdown")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center text-green-600 text-2xl font-bold">
          PLAYO
        </Link>

        {/* Menu Center */}
        <div className="flex items-center space-x-12 text-gray-700 text-lg">
          <Link to="/play" className="flex items-center space-x-2 hover:text-green-600 transition">
            <FaRunning />
            <span>Play</span>
          </Link>

          <Link to="/book" className="flex items-center space-x-2 hover:text-green-600 transition">
            <FaBaseballBall />
            <span>Book</span>
          </Link>

          <Link to="/train" className="flex items-center space-x-2 hover:text-green-600 transition">
            <FaChalkboardTeacher />
            <span>Train</span>
          </Link>
        </div>

        {/* User Icon Right */}
        <div>
          {!isLoggedIn ? (
            <Link to="/login" className="flex items-center text-gray-700 hover:text-green-600">
              <FaUserCircle size={28} />
            </Link>
          ) : (
            <div className="relative profile-dropdown">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center text-gray-700 hover:text-green-600"
              >
                <FaUserCircle size={28} />
                <span className="ml-2 font-medium">{userName}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
