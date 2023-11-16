import React, { useEffect } from "react";
import { Navbar, Dropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import MyProfile from "./myprofile";
import { logout } from "../Redux/action";
import "../styles/l-header.css";
 
function Header() {
  const dispatch = useDispatch();
  const user1 = useSelector((state) => state?.auth?.user?.user?.username);
  const user2 = useSelector((state) => state?.mongodb?.mongodbData?.username);
  const user = useSelector((state) => state?.google?.googleData?.name);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = user || user1 || user2;

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const getWelcomeMessage = () => {
    if (user || user1 || user2) {
      return `Welcome, ${user || user1 || user2}`;
    } else {
      return "Welcome, My Profile";
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    googleLogout();
    navigate("/");
  };

  useEffect(() => {
    if (!isLoggedIn && location.pathname === "/home") {
      navigate("/");
    }
  }, [isLoggedIn, location, navigate]);

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="ms-2 text-black fs-4">
          {getWelcomeMessage()}
        </div>
        <div className="ms-auto">
          <Navbar className="nav">
            <Dropdown align="end">
              <Dropdown.Toggle variant="" id="dropdown-basic" className="ml-auto ms-3 border-0">
                <div class="d-flex justify-content-end align-items-center">
                  <div class="rounded-circle small-circle ms-1 me-6 mt-0"> {/* Adjust the ms and me classes */}
                    {getInitials(user || user1 || user2)}
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <MyProfile />
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar>
        </div>
      </div>
    </>
  );
}

export default Header;
