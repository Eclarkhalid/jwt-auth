import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]); // Added setCookie

  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        "https://jwt-auth-server-fxi9.onrender.com",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      setUsername(user);

      if (!status) {
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies, navigate]);

  const Logout = () => {
    // Remove the token cookie only when the user wants to log out
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
