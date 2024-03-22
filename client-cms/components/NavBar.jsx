import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure",
    });

    if (result.isConfirmed) {
      localStorage.clear();
      Swal.fire({
        title: "Logout Success!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    }
  };

  return (
    <header className="navbar bg-white border-b border-gray-200 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-800 font-semibold hover:text-gray-900">Asset</Link>
          <Link to="/asset" className="text-gray-800 font-semibold hover:text-gray-900">Add Asset</Link>
          <Link to="/add-user" className="text-gray-800 font-semibold hover:text-gray-900">Add Member</Link>
        </div>
        <button onClick={handleLogout} className="text-red-600 font-semibold hover:text-red-700">Logout</button>
      </nav>
    </header>
  );
}
