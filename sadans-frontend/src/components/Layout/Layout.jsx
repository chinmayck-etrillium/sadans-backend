import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    await fetch("http://localhost:3004/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      {!loading && (
        <div className="min-h-screen bg-gray-50">
          <Header
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            handleLogout={handleLogout}
          />

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Outlet />
            </div>
          </main>
        </div>
      )}
      {loading && <LoadingSpinner />}
    </>
  );
}
