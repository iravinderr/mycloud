import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import StorageInfo from "./StorageInfo";
import { RedButton } from "../";
import useAuthNavigation from "../../hooks/AuthNavigation";
import { deleteRequestAxios, postRequestAxios } from "../../services/requests";
import { deleteAccountAPI, logoutAPI } from "../../services/apis";
import toast from "react-hot-toast";

function Header() {
  const { authenticated, setAuthenticated } = useAuthNavigation();
  const [showConfirmDeletion, setShowCofirmDeletion] = useState(false);

  const setConfirmDeletion = () => setShowCofirmDeletion(true);

  const handleLogout = async () => {
    try {
      const response = await postRequestAxios(logoutAPI);
      if (response.data.success) {
        setAuthenticated(false);
        toast.success(response.data.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAccountDeletion = async () => {
    try {
      const response = await deleteRequestAxios(deleteAccountAPI);
      if (response.data.success) {
        toast.success(response.data.message);
        setAuthenticated(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const navItems = [
    {
      name: "Login",
      path: "/login",
      active: !authenticated,
    },
    {
      name: "Register",
      path: "/register",
      active: !authenticated,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      active: authenticated,
    },
    {
      name: "Profile",
      path: "/profile",
      active: authenticated,
    },
  ];

  return (
    <header className="sticky top-0">
      <nav className="h-16 w-screen p-2 flex justify-evenly Header bg-RaisinBlack gap-2">
        <div className="w-1/2 flex justify-center items-center  ">
          <Link to="/">Cloudfrost</Link>
        </div>
        <ul className="w-1/2 flex justify-evenly items-center">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ) : null
          )}
          {authenticated && (
            <li>
              <RedButton text={"Logout"} onClick={handleLogout} />
            </li>
          )}
          {authenticated && (
            <li>
              {!showConfirmDeletion ? (
                <RedButton
                  text={"Delete Account"}
                  onClick={setConfirmDeletion}
                />
              ) : (
                <RedButton
                  text={"Confirm Deletion"}
                  onClick={handleAccountDeletion}
                />
              )}
            </li>
          )}
          {authenticated && (
            <li>
              <StorageInfo />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
