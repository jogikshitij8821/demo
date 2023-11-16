import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGoogleData } from "../Redux/action";
import { ClipLoader } from "react-spinners";
import logger from "../../logger";
import '../styles/google.css';

function Google({ setLoadingState }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  // Function to handle the Google login

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setLoadingState(true);  // Set loading state to true
      setUser(codeResponse);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      setLoadingState(false);   // Set loading state to false on error
    },
  });

  useEffect(() => {

    // Check if the 'user' object is available
    if (user) {
      setLoading(true);

      // Log the access token received from Google
      logger.log("user's access token", user.access_token);

      // Set the access token in the axios default headers
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.access_token}`;

      // Send a GET request to your backend API
      axios
        .get(
          `${apiurl}/v1/auth/google`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {

          //dispatch the recieved data for redux
          logger.log('Response data:', res.data);      // Add this line for debugging
          dispatch(setGoogleData(res.data));
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate("/home");
        })
        .catch((err) => {
          logger.error(err);
        })
    }
  }, [user]);

  return (
    <div className="d-flex align-items-center " onClick={login}>

      {/* Loading state should be managed by LandingPage */}
      <div className="fab fa-google fa-2x ml-1">
        G
      </div>
      <span className=" ml-1 font-weight-bold">Login</span>
    </div>
  );
}

export default Google;