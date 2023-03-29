import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

function NavBar() {
  const navigation = [
    { name: "Home", href: "#", current: true },
    { name: "Shops", href: "#", current: false },
    { name: "Order Tracker", href: "#", current: false },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowDropdown(false);
  };

  return (
    <nav className="flex justify-between items-center bg-darkbg text-white py-4 px-8">
      <h1 className="text-3xl font-bold">Herbal Store</h1>

      <div className="flex items-center">
        <ul className="flex items-center space-x-5 text-md">
          {navigation.map((navItem) => (
            <li key={navItem.name}>
              <a
                href={navItem.href}
                className={`${
                  navItem.current ? "text-primarylight" : "hover:text-gray-400"
                }`}
              >
                {navItem.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative ml-6">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
          <input
            type="text"
            placeholder="Search for herbs, supplements, and more"
            className="bg-gray-800 w-96 text-white rounded-full py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primarylight focus:border-transparent"
          />
        </div>
        <div className="relative ml-6">
          <a href="#" className="text-white">
            <ShoppingBagIcon className="h-7 w-7 text-white" aria-hidden="true"/>
          </a>
        </div>

        {isLoggedIn ? (
          <div className="relative ml-6">
            <button
              onClick={handleProfileClick}
              className="bg-secondary text-white rounded-full h-10 w-10 flex items-center justify-center focus:outline-none"
            >
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                alt="User profile"
                className="h-9 w-9 rounded-full"
              />
            </button>
            {showDropdown && (
              <ul className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg z-10">
                <li className="px-3 py-2 hover:bg-secondary rounded-lg">
                  <a href="#">Account settings</a>
                </li>
                <li className="px-3 py-2 hover:bg-secondary rounded-lg" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button 
            className="ml-6 bg-secondary hover:bg-primarylight hover:text-gray-900 text-white rounded-lg py-2 px-4"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;